const { User, Logins } = require("../db.js");
const { generateBot } = require("./ExtractDB/generateBot");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { Op } = require("sequelize");

const botUserAdd = async () => {
  try {
    const userx = await generateBot(); //GENERA UN BOT
    const userbot = await User.create(userx); // SUBE EL BOT A LA BASE
    return { message: "BOT CREADO", userbot }; // RETORNA EL BOT PARA EL MENSAJE
  } catch (error) {
    return error;
  }
};

const getId = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await User.findByPk(id);
  if (!dataValues) throw new Error("Usuario inexistente");

  return dataValues;
};
const getListUser = async () => {
  try {
    let listUser = await User.findAll();
    if (!listUser) {
      throw Error("No existen Usuarios Registrados");
    }
    return listUser;
  } catch (error) {
    return error;
  }
};

const userByName = async (name) => {
  const user = await User.findAll({
    where: {
      first_name: { [Op.iLike]: `%${name}%` },
    },
  });

  if (!user.length) throw Error("No se encuentran coincidencias");
  return user;
};

const setVerify = async (token) => {
  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.getLogins(decoded.id);
  console.log(user)
  if (user) {
    const result = await Logins.update(
      { verify: true },
      {
        where: {
          email: user.email,
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
