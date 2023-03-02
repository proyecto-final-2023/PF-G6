const { Trainee, Membership, User, PlanTrainee } = require("../db");

const listTraineesbyPlan = async (idPlanTrainee, page, limit) => {
  try {
    const listTrainees = await PlanTrainee.findByPk(idPlanTrainee, {
      attributes: [],
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
      ],
      limit: limit,
      offset: (page - 1) * limit,
    });
    return listTrainees;
  } catch (error) {
    return error;
  }
};

const listTrainees = async (page, limit) => {
  try {
    const listTrainees = await Trainee.findAll({
      include: [
        {
          model: Membership,
          attributes: ["userId"],
          include: [
            {
              model: PlanTrainee,
              attributes: ["name"],
            },
            {
              model: User,
              attributes: ["first_name", "last_name", "imgURL"],
            },
          ],
        },
      ],
      attributes: [],
      limit: limit,
      offset: (page - 1) * limit,
    });
    return listTrainees;
  } catch (error) {
    return error;
  }
};

module.exports = { listTrainees, listTraineesbyPlan };
