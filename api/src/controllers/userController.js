const { User } = require("../db");
const { generateBot } = require("./ExtractDB/generateBot");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const botUserAdd = async () => {
  try {
    const userx = await generateBot(); //GENERA UN BOT
    const userbot = await User.create(userx); // SUBE EL BOT A LA BASE
    return { message: "BOT CREADO", userbot }; // RETORNA EL BOT PARA EL MENSAJE
  } catch (error) {
    return error;
  }
};

const setVerify = async (token) => {
  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user) {
    const result = User.update(
      { verify: true },
      {
        where: {
          email: mail,
        },
      }
    );
    console.log(result);
    return result;
  }
};

module.exports = {
  botUserAdd,
  setVerify,
};
