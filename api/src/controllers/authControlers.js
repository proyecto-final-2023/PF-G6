const bcrypt = require("bcryptjs");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const config = require("../../config");

async function encPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, receivedPassword) {
  return await bcrypt.compare(password, receivedPassword);
}

async function signUP(obj) {
  const { first_name, last_name, nick_name, email, password, rol, imgURL } =
    obj;
  //se usa para crear un nuevo usuario
  //el objeto requiere los siguientes datos
  //   first_name, last_name, nick_name, email, password, rol, imgURL
  const user = await User.findOne({ where: { email: email } });
  if (user) throw new Error("El usuario ya existe");
  const pass = encPassword(obj.password);
  const create = User.create({
    first_name,
    last_name,
    nick_name,
    email,
    password,
    rol,
    imgURL,
  });
  return token(create.id);
}

async function signIn(email, password) {
  //se usa para enviar un token a los usuarios que se loguean via login local
  const user = await User.findOne({ where: { email: email } });
  if (!user.id) throw new Error("Usuario no existe");
  const exist = comparePassword(user.password, password);
  const tkn = token(user.dataValues.id);
  return tkn;
}

function token(id) {
  //genera el token
  if (!id) throw new Error({ message: "Debe enviar un id" });
  const tok = jwt.sign({ id: id }, config.SECRET, { expiresIn: 604800 }); //expira en 7 dias
  return { token: tok };
}

module.exports = { signIn, signUP, encPassword };
