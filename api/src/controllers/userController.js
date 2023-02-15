const { User } = require("../db");
const { generateBot } = require("./ExtractDB/generateBot");

const botUserAdd = async () => {
  try {
    userx = await generateBot();
    userbot = await User.create(userx); // luego subo los datos extraidos a la bd
    console.log(userbot);
    return userBot;
  } catch (error) {
    return error;
  }
};

module.exports = {
  botUserAdd,
};
