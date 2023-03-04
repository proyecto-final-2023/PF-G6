const {
  Trainer,
  Trainee,
  Plan,
  Activity,
  Aliments,
  Membership,
  User,
  PlanTrainee,
  Certificates,
  SocialNetworks,
  ActivitiesPlan,
  AlimentsPlan,
  Rating,
} = require("../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const ratingTotal = async (id) => {
  const trai = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "imgURL"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });

  const trainerId = trai.membership.trainerIdTrainer;
  if (!trainerId) throw Error("Trainer no encontrado");

  const rating = await Rating.findOne({
    attributes: [[sequelize.fn("AVG", sequelize.col("value")), "rating"]],
    where: {
      trainerIdTrainer: trainerId,
      value: {
        [Op.gt]: 0,
      },
    },
  });
  if (!rating) throw Error("No lo han Calificado");
  return rating;
};
const addLogo = async (id, logo) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });

  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer);
  if (!trainer) {
    throw new Error(`No se encontró al entrenador con ID ${id}.`);
  }

  // Actualizamos la propiedad `logo` del entrenador con el nuevo valor
  await trainer.update({ logo });

  // Devolvemos un mensaje de confirmación
  return `Se actualizó el logo del entrenador  ${user.first_name}, ${user.last_name}`;
};

const addSocial = async (id, name, url) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });
  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer);

  const social = await SocialNetworks.create({
    name,
    url,
  });
  await trainer.addSocialNetworks(social);
  return `El certificado ${social.name} se añadio a ${user.first_name}, ${user.last_name}`;
};

const addCertificate = async (id, type, name, url, description) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });

  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer);

  const certificate = await Certificates.create({
    type,
    name,
    url,
    description,
  });
  await trainer.addCertificate(certificate);
  return `El certificado ${certificate.name} se añadio a ${user.first_name}, ${user.last_name}`;
};

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

const createPlan = async (id, idTrainee, datePlan, activities, aliments) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });
  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer, {
    attributes: ["id_trainer"],
  });

  if (!trainer) {
    throw Error("Trainer no encontrado");
  }
  const trainee = await Trainee.findByPk(idTrainee, {
    attributes: ["id_trainee"],
  });
  if (!trainee) {
    throw Error("Trainee no encontrado");
  }

  const plan = await Plan.create(
    {
      datePlan,
      trainerIdTrainer: trainer.id_trainer,
      traineeIdTrainee: trainee.id_trainee,
      ActivitiesPlans: activities.map((activity) => ({
        idActivity: activity.idActivity,
        series: activity.series,
        repetitions: activity.series,
      })),
      AlimentsPlans: aliments.map((aliment) => ({
        idAliment: aliment.idAliment,
        portion: aliment.portion,
        time: aliment.time,
      })),
    },
    {
      include: [ActivitiesPlan, AlimentsPlan],
    }
  );

  trainee;

  return plan;
};

module.exports = {
  listTrainers,
  addCertificate,
  addSocial,
  addLogo,
  createPlan,
  ratingTotal,
};
