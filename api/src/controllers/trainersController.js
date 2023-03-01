const { Trainer, Membership, User, PlanTrainee } = require("../db");

const listTrainers = async (page, limit) => {
  try {
    const listTrainers = await Trainer.findAll({
      attributes: ["id_trainer", "logo"],
      include: [
        {
          model: Membership,
          attributes: ["userId"],
          include: [
            {
              model: User,
              attributes: ["first_name", "last_name", "imgURL"],
            },
          ],
        },
        { model: PlanTrainee },
      ],
      limit: limit,
      offset: (page - 1) * limit,
    });
    return listTrainers;
  } catch (error) {
    return error;
  }
};

module.exports = { listTrainers };
