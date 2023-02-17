const { Activity } = require("../db");
const { exercices } = require("./ExtractDB/exercices");
const { Op } = require("sequelize");

const exercicesFilter = async (type, parameter) => {
  let activityFil = {};
  if (type !== "bodyPart" && type !== "equipment" && type !== "target") {
    throw Error(`El tipo ${type} es una opcion invalida`);
  }
  if (type === "bodyPart") {
    activityFil = await Activity.findAll({
      where: {
        bodyPart: parameter,
      },
    });
  }
  if (type === "equipment") {
    activityFil = await Activity.findAll({
      where: {
        equipment: parameter,
      },
    });
  }
  if (type === "target") {
    activityFil = await Activity.findAll({
      where: {
        target: parameter,
      },
    });
  }
  if (!activityFil.length) {
    throw Error(`El parametro ${parameter} es una opcion invalida`);
  }
  return activityFil;
};

const activityByName = async (name) => {
  const antivity = await Activity.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  if (!antivity.length) throw Error("No se encuentran coincidencias");
  return antivity;
};

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

const getId = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await Activity.findByPk(id);
  if (!dataValues) throw new Error("Ejercicio inexistente");

  return dataValues;
};

module.exports = {
  getListActivities,
  getId,
  activityByName,
  exercicesFilter,
};
