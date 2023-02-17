const bcrypt = require("bcryptjs");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { sendEmail, getTemplate } = require("./Mail/Config.mail");

async function encPassword(password) {
  //hashea la contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePassword(password, receivedPassword) {
  //compara la contraseña enviada con la hasheada
  return await bcrypt.compare(receivedPassword, password);
}

async function signUP(obj) {
  const { first_name, last_name, nick_name, email, password, rol, imgURL } =
    obj;
  //se usa para crear un nuevo usuario
  //el objeto requiere los siguientes datos
  //   first_name, last_name, nick_name, email, password, rol, imgURL
  const user = await User.findOne({ where: { email: email } });
  if (user) throw new Error("El usuario ya existe");
  const pass = await encPassword(obj.password);
  const create = await User.create({
    first_name,
    last_name,
    nick_name,
    email,
    password: pass,
    rol,
    imgURL,
  });
  //aqui va para enviar el mail y esperar que verifique
  try {
    console.log(create);
    const template = getTemplate(first_name, token(create.id));
    const send = sendEmail(email, template);
    return send;
  } catch (error) {
    return error.message;
  }
}

async function signIn(email, password) {
  //se usa para enviar un token a los usuarios que se loguean via login local
  //se debe implementar una funcion para saber si el usuario es verificado
  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new Error("Usuario no existe");
  if (!user.verify) throw new Error("Usuario no verificado"); //si el usuario no esta verificado no puede loguear
  const exist = await comparePassword(user.dataValues.password, password);
  if (!exist) throw new Error("usuario no existe o password incorrecto");
  else {
    const tkn = token(user.dataValues.id);
    return tkn;
  }
}

function token(id) {
  //genera el token
  if (!id) throw new Error({ message: "Debe enviar un id" });
  const tok = jwt.sign({ id: id }, config.SECRET, { expiresIn: 604800 }); //expira en 7 dias
  return { token: tok };
}

module.exports = { signIn, signUP, encPassword };
