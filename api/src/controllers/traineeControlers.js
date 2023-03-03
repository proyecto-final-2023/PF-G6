const {
  Trainee,
  Membership,
  User,
  PlanTrainee,
  Comment,
  Trainer,
} = require("../db");

const addComment = async (id, comment) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "imgURL"],
    include: [
      {
        model: Membership,
        attributes: ["traineeIdTrainee"],
      },
    ],
  });
  const trai = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "imgURL"],
    include: [
      {
        model: Membership,
        attributes: ["id_membership"],
        include: [
          {
            model: PlanTrainee,
            attributes: ["trainerIdTrainer"],
          },
        ],
      },
    ],
  });

  const trainer = await Trainer.findByPk(
    trai.membership.planTrainee.trainerIdTrainer
  );
  const trainee = await Trainee.findByPk(user.membership.traineeIdTrainee);

  const addcomment = await Comment.create({
    message: comment,
    trainerIdTrainer: trai.membership.planTrainee.trainerIdTrainer,
    traineeIdTrainee: user.membership.traineeIdTrainee,
  });
  return addcomment;
};

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

module.exports = { listTrainees, listTraineesbyPlan, addData, addComment };
