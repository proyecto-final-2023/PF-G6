const {
  User,
  Logueo,
  Membership,
  Voucher,
  PlanTrainee,
  Plantrainer,
  Trainer,
} = require("../db");
const { generateBot } = require("./ExtractDB/generateBot");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

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
    include: [
      { model: Logueo },
      {
        model: Membership,
        attributes: ["id_membership", "startDate", "finishDate"],
        include: [
          { model: Trainer },
          {
            model: Voucher,
            attributes: ["id_voucher", "date", "cost"],
          },
          { model: Plantrainer },
          { model: PlanTrainee },
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
    throw error;
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
module.exports = {
  botUserAdd,
  getId,
  getListUser,
  userByName,
  setVerify,
};
