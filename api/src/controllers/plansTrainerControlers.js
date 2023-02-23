const { Plantrainer } = require("../db");

const postPlansTrainer = async (
  name,
  cost,
  category,
  description,
  cantTrainees
) => {
  const plans = await Plantrainer.findOne({ where: { name } });
  console.log(plans)
  if (plans) throw new Error("Este plan ya existe");
  const result = await Plantrainer.create({
    name,
    cost,
    category,
    description,
    cantTrainees,
  });

  console.log(result);
  return result;
};

const allPlans = async () => {
  const all = await Plantrainer.findAll();
  return all.map((element) => {
    return {
      name: element.dataValues.name,
      cost: element.dataValues.cost,
      category: element.dataValues.category,
      description: element.dataValues.description,
      cantTrainees: element.dataValues.cantTrainees,
    };
  });
};

module.exports = { postPlansTrainer, allPlans };
