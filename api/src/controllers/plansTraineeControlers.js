const { PlanTrainee, User, Membership, Trainer } = require("../db");

const postPlansTrainee = async (name, cost, description, idUser) => {
  const plans = await PlanTrainee.findOne({ where: { name, status: true } });
  const user = await User.findByPk(idUser, {
    attributes: [],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });
  const idTrainer = user.dataValues.membership.dataValues.trainerIdTrainer;
  if (plans) throw new Error("Este plan ya existe");
  const result = await PlanTrainee.create({
    name,
    cost,
    description,
  });
  await result.setTrainer(idTrainer);

  return result;
};

const putPlansTrainee = async (id_PlanTrainee, name, cost, description) => {
  const plans = await PlanTrainee.findByPk(id_PlanTrainee);
  if (!plans) throw new Error("Plan no encontrado");
  await plans.update({
    name,
    cost,
    description,
  });

  return plans;
};

module.exports = { postPlansTrainee, putPlansTrainee };
