const { Activity } = require("../db");
const { exercices } = require("./ExtractDB/exercices");

const getListActivities = async () => {
  try {
    let listActivities = await Activity.findAll(); //Trae los datos de la base a una varible
    if (!listActivities.length) {
      await Activity.bulkCreate(exercices); // luego subo los datos extraidos a la bd
    }

    listActivities = await Activity.findAll();

    return listActivities;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getListActivities,
};
