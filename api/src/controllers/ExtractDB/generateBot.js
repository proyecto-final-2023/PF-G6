const axios = require("axios");
API = "https://randomuser.me/api/";

const generateBot = async () => {
  const bot = await axios.get(API);
  try {
    const userBot = bot.data.results[0];

    const result = {
      first_name: userBot.name.first,
      last_name: userBot.name.last,
      nick_name: userBot.login.username,
      email: userBot.email,
      password: userBot.login.password,
      imgURL: userBot.picture.large,
      gender: userBot.gender,
      phone: userBot.phone,
      cell: userBot.cell,
      rol: "bot",
    };
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateBot,
};
