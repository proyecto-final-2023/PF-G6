const { where } = require("sequelize");
const {
  Trainee,
  Membership,
  User,
  PlanTrainee,
  Comment,
  Trainer,
  Rating,
} = require("../db");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const updateRating = async (id, value) => {
  if (value < 0 || value > 5) {
    throw Error("El valor de la calificación debe estar entre 1 y 5");
  }
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
  const traineeId = user.membership.traineeIdTrainee;
  const trainerId = trai.membership.planTrainee.trainerIdTrainer;

  const filters = {
    where: {
      traineeIdTrainee: traineeId,
      trainerIdTrainer: trainerId,
    },
  };
  const ratings = await Rating.findOne(filters);
  console.log(ratings);
  if (!ratings) throw Error(`La calificación con id ${filters} no existe`);

  ratings.value = value;
  await ratings.save();

  return ratings;
};

const getRating = async (id) => {
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

  const traineeId = user.membership.traineeIdTrainee;
  const trainerId = trai.membership.planTrainee.trainerIdTrainer;

  const filters = {
    where: {
      traineeIdTrainee: traineeId,
      trainerIdTrainer: trainerId,
    },
  };
  const ratings = await Rating.findOne(filters);

  const rating = await Rating.findOne({
    attributes: [[sequelize.fn("AVG", sequelize.col("value")), "rating"]],
    where: {
      trainerIdTrainer: trainerId,
      value: {
        [Op.gt]: 0,
      },
    },
  });

  return { value: ratings.value, rating };
};

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
  if (!trainer) throw Error("No se encontro al Trainer");
  const trainee = await Trainee.findByPk(user.membership.traineeIdTrainee);
  if (!trainee) throw Error("No se encontro al Trainee");

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
              include: [
                {
                  model: Membership,
                  attributes: ["traineeIdTrainee"],
                  include: [Trainee],
                },
              ],
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

module.exports = {
  listTrainees,
  listTraineesbyPlan,
  addData,
  addComment,
  updateRating,
  getRating,
};
