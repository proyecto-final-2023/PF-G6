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

function signUP(obj) {
    const {first_name, last_name, nick_name, email, password, rol, imgURL}= obj;
  //se usa para crear un nuevo usuario
  //el objeto requiere los siguientes datos
  //   first_name, last_name, nick_name, email, password, rol, imgURL
  const pass = encPassword(obj.password);
  
}

function signIn(email, password) {
  //se usa para enviar un token
  const user = User.findOne({ where: { email: email } });
  if (user.id && comparePassword(user.password, password)) return token(user.id)
}

function token(id){
    jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 604800 }); //expira en 7 dias
}

module.exports = { encPassword, comparePassword };
