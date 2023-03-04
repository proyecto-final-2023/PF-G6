const {
  User,
  Logueo,
  Membership,
  Voucher,
  PlanTrainee,
  Plantrainer,
  Trainer,
  Trainee,
  SocialNetworks,
  Certificates,
  ActivitiesPlan,
  AlimentsPlan,
  Plan,
  Comment,
  Rating,
} = require("../db");
const { generateBot } = require("./ExtractDB/generateBot");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const getPerfil = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await User.findByPk(id, {
    attributes: ["id", "first_name", "last_name", "nickname", "role", "imgURL"],
    include: [
      {
        model: Logueo,
        attributes: ["email", "verify"],
      },
      {
        model: Membership,
        attributes: ["id_membership", "startDate", "finishDate"],
        include: [
          {
            model: Trainee,
            include: [
              {
                model: Plan,
                attributes: ["id_plan", "datePlan"],
                include: [
                  {
                    model: ActivitiesPlan,
                    attributes: ["idActivity", "series", "repetitions"],
                  },
                  {
                    model: AlimentsPlan,
                    attributes: ["idAliment", "portion", "time"],
                  },
                ],
              },
            ],
          },
          {
            model: Trainer,
            attributes: {
              exclude: ["id_trainer"],
            },
            include: [
              // { model: Rating },
              { model: Certificates },
              { model: SocialNetworks },
              {
                model: Comment,
                attributes: ["message"],
                include: [
                  {
                    model: Trainee,
                    attributes: ["id_trainee"],

                    include: [
                      {
                        model: Membership,
                        attributes: ["id_membership"],
                        include: [
                          {
                            model: User,
                            attributes: ["first_name", "imgURL"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Voucher,
            attributes: ["id_voucher", "date", "cost"],
          },
          { model: Plantrainer },
          {
            model: PlanTrainee,
            attributes: ["name", "description"],
            include: [
              {
                model: Trainer,
                attributes: ["logo"],

                include: [
                  {
                    model: Membership,
                    attributes: {
                      exclude: [
                        "id_membership",
                        "startDate",
                        "finishDate",
                        "userId",
                        "plantrainerIdPlanTrainer",
                        "planTraineeIdPlanTrainee",
                        "traineeIdTrainee",
                      ],
                    },

                    include: [
                      {
                        model: User,
                        attributes: [
                          "first_name",
                          "last_name",
                          "nickname",
                          "imgURL",
                          "phone",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { model: Trainer, include: [{ model: PlanTrainee }] },
        ],
      },
    ],
  });
  if (!dataValues) throw new Error("Usuario inexistente");
  return dataValues;
};

const botUserAdd = async () => {
  try {
    const userx = await generateBot(); //GENERA UN BOT
    const userbot = await User.create(userx); // SUBE EL BOT A LA BASE
    const logueo = await Logueo.create({
      email: userx.email,
      password: userx.password,
      verify: true,
    });
    await userbot.setLogueo(logueo);
    return { message: "BOT CREADO", userbot, logueo }; // RETORNA EL BOT PARA EL MENSAJE
  } catch (error) {
    return error;
  }
};

const getId = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "nickname", "role", "imgURL"],
    include: [
      {
        model: Logueo,
        attributes: ["email"],
      },
      {
        model: Membership,
        attributes: {
          exclude: [
            "id_membership",
            "startDate",
            "finishDate",
            "userId",
            "plantrainerIdPlanTrainer",
            "planTraineeIdPlanTrainee",
          ],
        },
        include: [
          {
            model: Trainer,
            attributes: ["logo"],
            include: [{ model: PlanTrainee }],
          },
        ],
      },
    ],
  });
  if (!dataValues) throw new Error("Usuario inexistente");

  return dataValues;
};

const getListUser = async (page) => {
  try {
    const offset = (page - 1) * 10;
    const listUser = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "nickname",
        "role",
        "imgURL",
      ],
      limit: 10,
      offset,
    });
    if (!listUser || listUser.length === 0) {
      throw new Error("No existen Usuarios Registrados");
    }
    return listUser;
  } catch (error) {
    return error;
  }
};

const userByName = async (name, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const user = await User.findAndCountAll({
      attributes: ["first_name", "last_name", "nickname", "role", "imgURL"],
      limit,
      offset,
      where: Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("first_name"),
          " ",
          Sequelize.col("last_name")
        ),
        { [Op.iLike]: `%${name}%` }
      ),
    });
    if (!user.rows || user.rows.length === 0) {
      throw new Error("No se encuentran coincidencias");
    }
    const totalPages = Math.ceil(user.count / limit);
    return { totalPages, users: user.rows };
  } catch (error) {
    throw error;
  }
};

const setVerify = async (token) => {
  const decoded = jwt.verify(token, config.SECRET);
  console.log(decoded);
  const [user] = await Logueo.findAll({
    where: { userId: decoded.id },
  });
  if (user) {
    const result = await Logueo.update(
      { verify: true },
      {
        where: {
          email: user.dataValues.email,
        },
      }
    );
    return result;
  }
};

const listEmail = async (email) => {
  try {
    const listUser = await Logueo.findAll({
      where: {
        email: email,
      },
    });
    if (listUser.length) {
      return { verify: true };
    } else {
      return { verify: false };
    }
  } catch (error) {
    return error;
  }
};
module.exports = {
  botUserAdd,
  getId,
  getListUser,
  userByName,
  setVerify,
  getPerfil,
  listEmail,
};
