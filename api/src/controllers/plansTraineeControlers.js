const { PlanTrainee } = require("../db");

const postPlansTrainee = async (name, cost, description, idTrainer) => {
  const plans = await PlanTrainee.findOne({ where: { name } });
  if (plans) throw new Error("Este plan ya existe");
  const result = await PlanTrainee.create({
    name,
    cost,
    description,
  });
  await result.setTrainer(idTrainer);

  console.log(result);
  return result;
};

// const allPlans = async () => {
//   const all = await Plantrainer.findAll();
//   return all.map((element) => {
//     return {
//       name: element.dataValues.name,
//       cost: element.dataValues.cost,
//       category: element.dataValues.category,
//       description: element.dataValues.description,
//       cantTrainees: element.dataValues.cantTrainees,
//     };
//   });
// };

module.exports = { postPlansTrainee };