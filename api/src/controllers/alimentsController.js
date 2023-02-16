const { Aliments } = require("../db");
const { aliments } = require("./ExtractDB/aliments");

const getListAliments = async () => {
  try {
    let listAliments = await Aliments.findAll();
    if (!listAliments.length) {
      // for (let index = 0; index <= 2; index++) {
      await Aliments.bulkCreate(aliments);
      // }
    }
    listAliments = await Aliments.findAll();
    return listAliments;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getListAliments,
};
