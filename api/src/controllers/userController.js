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
const sequelize = require("sequelize");

const getPerfil = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await User.findByPk(id, {
    // attributes: ["id", "first_name", "last_name", "nickname", "role", "imgURL"],
    include: [
      {
        model: Logueo,
        attributes: ["email", "verify"],
      },
      {
        model: Membership,
        attributes: ["id_membership", "startDate", "finishDate", "trainerIdTrainer"],
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
    attributes: [
      "first_name",
      "last_name",
      "nickname",
      "role",
      "imgURL",
      "status",
    ],
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
            include: [{ model: PlanTrainee, where:{status:true} }],
          },
        ],
      },
    ],
  });
  if (!dataValues) throw new Error("Usuario inexistente");
  if (!dataValues.status) throw new Error("Usuario desactivado");

  return dataValues;
};

const getListUser = async (page) => {
  try {
    const offset = (page - 1) * 10;
    const listUser = await User.findAll({
      where: { status: true },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "nickname",
        "role",
        "imgURL",
      ],
      include: [{ model: Membership }],
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

const addData = async (
  id,
  first_name,
  last_name,
  nickname,
  imgURL,
  gender,
  phone
) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error(`No se encontró al usuario con ID ${id}.`);
  }
  await user.update({
    id,
    first_name,
    last_name,
    nickname,
    imgURL,
    gender,
    phone,
  });

  return `Se actualizó los datos del Usuario  ${user.first_name}, ${user.last_name}`;
};

const statusAlter = async (id) => {
  const planM = await Plantrainer.findByPk(id);
  if (planM) {
    await planM.update({ status: !planM.status });
    return `Plan ${planM.name} status:${planM.status}`;
  }

  const planM2 = await PlanTrainee.findByPk(id);
  if (planM2) {
    await planM2.update({ status: !planM2.status });
    return `Plan ${planM2.name} status:${planM2.status}`;
  }

  const user = await User.findByPk(id);
  if (user) {
    await user.update({ status: !user.status });
    return `Usuario ${user.first_name} ${user.last_name} status:${user.status}`;
  }

  return `No existe asociación con el ID ${id}`;
};

const listComment = async (id, page, pageSize) => {
  const trainerId = id;
  if (!trainerId) throw Error("Trainer no Encontrado");

  const comments = await Comment.findAll({
    where: {
      trainerIdTrainer: trainerId,
    },
    attributes: ["id", "message"],
    include: [
      {
        model: Trainee,
        attributes: ["id_trainee"],
        include: [
          {
            model: Membership,
            attributes: ["id_membership"],
            include: [
              { model: User, attributes: ["id", "nickname", "imgURL"] },
            ],
          },
        ],
      },
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });

  return comments;
};

const ratingTotal = async (id) => {
  const trainerId = id;
  if (!trainerId) throw Error("Trainer no encontrado");

  const rating = await Rating.findOne({
    attributes: [[sequelize.fn("AVG", sequelize.col("value")), "rating"]],
    where: {
      trainerIdTrainer: trainerId,
      value: {
        [Op.gt]: 0,
      },
    },
  });
  if (!rating) throw Error("No lo han Calificado");
  return rating;
};



module.exports = {
  botUserAdd,
  getId,
  getListUser,
  userByName,
  setVerify,
  getPerfil,
  listEmail,
  addData,
  statusAlter,
  ratingTotal,
  listComment,
};
