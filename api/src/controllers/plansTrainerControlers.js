const { Plantrainer } = require("../db");

const postPlansTrainer = async (name, cost, description, cantTrainees) => {
  const plans = await Plantrainer.findOne({ where: { name } });
  if (plans) throw new Error("Este plan ya existe");
  const result = await Plantrainer.create({
    name,
    cost,
    description,
    cantTrainees,
  });

  return result;
};

const allPlans = async (page = 0, pageSize = 5) => {
  const all = await Plantrainer.findAll({
    offset: page * pageSize,
    limit: pageSize,
  });
  return all.map((element) => {
    return {
      id: element.dataValues.id_planTrainer,
      name: element.dataValues.name,
      cost: element.dataValues.cost,
      category: element.dataValues.category,
      description: element.dataValues.description,
      cantTrainees: element.dataValues.cantTrainees,
    };
  });
};

module.exports = { postPlansTrainer, allPlans };
