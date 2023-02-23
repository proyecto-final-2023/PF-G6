const axios = require("axios");
const { encPassword } = require("../authControlers");
API = "https://randomuser.me/api/";

const generateBot = async () => {
  const bot = await axios.get(API);
  try {
    const userBot = bot.data.results[0];
    console.log(`-${userBot.login.password}-`);
    const result = {
      first_name: userBot.name.first,
      last_name: userBot.name.last,
      nickname: userBot.login.username,
      email: userBot.email,
      password: await encPassword(userBot.login.password),
      imgURL: userBot.picture.large,
      gender: userBot.gender,
      phone: userBot.phone,
      cell: userBot.cell,
      role: "bot",
    };
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateBot,
};
