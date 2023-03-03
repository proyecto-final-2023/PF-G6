const { Trainee, Membership, User, PlanTrainee } = require("../db");

const listTraineesbyPlan = async (idPlanTrainee, page, limit) => {
  try {
    const listTrainees = await PlanTrainee.findByPk(idPlanTrainee, {
      attributes: [],
      include: [
        {
          model: Membership,
          attributes: ["userId", "traineeIdTrainee"],
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
          attributes: ["userId", "traineeIdTrainee"],
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

const addData = async (
  id,
  weight,
  height,
  neck,
  torso,
  chest,
  waist,
  arm,
  wrist,
  hip,
  butt,
  thig,
  calf,
  allergies,
  surgeries,
  smoke,
  drinker,
  drugs,
  roids,
  water,
  lesions
) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["traineeIdTrainee"],
      },
    ],
  });

  const trainee = await Trainee.findByPk(user.membership.traineeIdTrainee);
  if (!trainee) {
    throw new Error(`No se encontró al entrenador con ID ${id}.`);
  }
  // Actualizamos la propiedad `logo` del entrenador con el nuevo valor
  await trainee.update({
    weight,
    height,
    neck,
    torso,
    chest,
    waist,
    arm,
    wrist,
    hip,
    butt,
    thig,
    calf,
    allergies,
    surgeries,
    smoke,
    drinker,
    drugs,
    roids,
    water,
    lesions,
  });

  return `Se actualizó los datos del entrenado  ${user.first_name}, ${user.last_name}`;
};

module.exports = { listTrainees, listTraineesbyPlan, addData };
