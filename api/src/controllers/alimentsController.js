const { Aliments } = require("../db");
const { aliments } = require("./ExtractDB/aliments");
const { Op } = require("sequelize");

const alimentByName = async (name, page) => {
  const offset = (page - 1) * 10;
  const aliment = await Aliments.findAll({
    limit: 10,
    offset,
    where: {
      description: { [Op.iLike]: `%${name}%` },
    },
  });

  if (!aliment.length) throw Error("No se encuentran coincidencias");
  return aliment;
};

const getListAliments = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    let listAliments = await Aliments.findAll({ limit, offset });
    if (!listAliments.length) {
      await Aliments.bulkCreate(aliments);
      console.log("aliments add");
      listAliments = await Aliments.findAll({ limit, offset });
    }
    return listAliments;
  } catch (error) {
    return error;
  }
};

const getId = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await Aliments.findByPk(id);
  if (!dataValues) throw new Error("Alimento inexistente");

  return dataValues;
};

const alimentFilter = async (type, page, pageSize, min, max) => {
  let alimentFil = {};

  if (min > max) {
    throw Error(`El valor maximo no pude ser menor al minimo`);
  }
  if (
    type !== "proteinAmount" &&
    type !== "fatTransAmount" &&
    type !== "fatSaturatedAmount" &&
    type !== "fatTotalAmount" &&
    type !== "sugarsAmount" &&
    type !== "sodiumAmount" &&
    type !== "cholesterolAmount" &&
    type !== "energyAmount" &&
    type !== "carbohydrateAmount"
  ) {
    throw Error(`El tipo ${type} es una opcion invalida`);
  }
  const offset = (page - 1) * pageSize;

  const typeOptions = {};
  if (min !== undefined) {
    typeOptions[Op.gte] = min;
  }
  if (max !== undefined) {
    typeOptions[Op.lte] = max;
  }

  if (type === "proteinAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        proteinAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "carbohydrateAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        carbohydrateAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "fatTransAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatTransAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "fatSaturatedAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatSaturatedAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "fatTotalAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatTotalAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "sugarsAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        sugarsAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "sodiumAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        sodiumAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "cholesterolAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        cholesterolAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (type === "energyAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        energyAmount: typeOptions,
      },
      limit: pageSize,
      offset,
    });
  }
  if (!alimentFil.length) {
    throw Error(`No se encontraron coinsidencias`);
  }
  return alimentFil;
};

module.exports = {
  getListAliments,
  getId,
  alimentFilter,
  alimentByName,
};
