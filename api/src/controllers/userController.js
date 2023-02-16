const { User } = require("../db");
const { generateBot } = require("./ExtractDB/generateBot");

const botUserAdd = async () => {
  try {
    const userx = await generateBot(); //GENERA UN BOT
    const userbot = await User.create(userx); // SUBE EL BOT A LA BASE
    return { message: "BOT CREADO", userbot }; // RETORNA EL BOT PARA EL MENSAJE
  } catch (error) {
    return error;
  }
};

module.exports = {
  botUserAdd,
};
