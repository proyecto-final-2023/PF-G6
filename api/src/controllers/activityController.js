const { Activity } = require("../db");
const { exercices } = require("./ExtractDB/exercices");
const { Op } = require("sequelize");

const exercicesFilter = async (type, parameter, pageSize, page) => {
  let activityFil = {};
  if (type !== "bodyPart" && type !== "equipment" && type !== "target") {
    throw Error(`El tipo ${type} es una opcion invalida`);
  }
  if (type === "bodyPart") {
    activityFil = await Activity.findAll({
      where: {
        bodyPart: parameter,
      },
      limit: pageSize,
      offset: pageSize * page,
    });
  }
  if (type === "equipment") {
    activityFil = await Activity.findAll({
      where: {
        equipment: parameter,
      },
      limit: pageSize,
      offset: pageSize * page,
    });
  }
  if (type === "target") {
    activityFil = await Activity.findAll({
      where: {
        target: parameter,
      },
      limit: pageSize,
      offset: pageSize * page,
    });
  }
  if (!activityFil.length) {
    throw Error(`El parametro ${parameter} es una opcion invalida`);
  }
  return activityFil;
};

const activityByName = async (name, page) => {
  const offset = (page - 1) * 10;
  const antivity = await Activity.findAll({
    limit: 10,
    offset,
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  if (!antivity.length) throw Error("No se encuentran coincidencias");
  return antivity;
};

const getListActivities = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;

    let listActivities = await Activity.findAll({ limit: pageSize, offset });

    if (!listActivities.length) {
      await Activity.bulkCreate(exercices);
      listActivities = await Activity.findAll({ limit: pageSize, offset });
    }

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
