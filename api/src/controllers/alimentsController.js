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

const getId = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await Aliments.findByPk(id);
  if (!dataValues) throw new Error("Alimento inexistente");

  return dataValues;
};

const alimentFilter = async (type, parameter) => {
  let alimentFil = {};
  if (
    type !== "dataType" &&
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
  if (type === "dataType") {
    alimentFil = await Aliments.findAll({
      where: {
        dataType: parameter,
      },
    });
  }
  if (type === "proteinAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        proteinAmount: parameter,
      },
    });
  }
  if (type === "carbohydrateAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        carbohydrateAmount: parameter,
      },
    });
  }
  if (type === "fatTransAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatTransAmount: parameter,
      },
    });
  }
  if (type === "fatSaturatedAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatSaturatedAmount: parameter,
      },
    });
  }
  if (type === "fatTotalAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        fatTotalAmount: parameter,
      },
    });
  }
  if (type === "sugarsAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        sugarsAmount: parameter,
      },
    });
  }
  if (type === "sodiumAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        sodiumAmount: parameter,
      },
    });
  }
  if (type === "cholesterolAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        cholesterolAmount: parameter,
      },
    });
  }
  if (type === "energyAmount") {
    alimentFil = await Aliments.findAll({
      where: {
        energyAmount: parameter,
      },
    });
  }
  if (!alimentFil.length) {
    throw Error(`El parametro ${parameter} es una opcion invalida`);
  }
  return alimentFil;
};

module.exports = {
  getListAliments,
  getId,
  alimentFilter,
};
