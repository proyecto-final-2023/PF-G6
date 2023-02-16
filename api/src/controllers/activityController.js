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

const getId = async(id)=>{
  if(!id)throw new Error("debe enviar un id valido")
  const {dataValues}= await Activity.findOne({ where: { id: id } });
  console.log(dataValues)
  return dataValues;
}

module.exports = {
  getListActivities,
  getId
};
