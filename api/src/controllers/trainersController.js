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
  Comment,
} = require("../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const listTrainees2 = async (id) => {
  const trai = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "imgURL"],
    include: [
      {
        model: Membership,
        // attributes: ["id_membership"],
        include: [
          {
            model: PlanTrainee,
            attributes: ["trainerIdTrainer"],
          },
        ],
      },
    ],
  });

  const trainerId = trai.membership.trainerIdTrainer;
  if (!trainerId) throw Error("Trainer no Encontrado");
  const traineesUser = await PlanTrainee.findAll({
    attributes: ["id_PlanTrainee", "name"],
    where: { trainerIdTrainer: trainerId },
    include: [
      {
        model: Membership,
        attributes: ["traineeIdTrainee"],
        include: [
          { model: User, attributes: ["first_name", "last_name", "imgURL"] },
        ],
      },
    ],
  });
  return traineesUser;
};

const listComment = async (id, page, pageSize) => {
  console.log(id);

  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name", "imgURL"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });

  const trainerId = user.membership.trainerIdTrainer;
  if (!trainerId) throw Error("Trainer no Encontrado");

  const comments = await Comment.findAll({
    where: {
      trainerIdTrainer: trainerId,
    },
    attributes: ["message"],
    include: [
      {
        model: Trainee,
        attributes: ["id_trainee"],
        include: [
          {
            model: Membership,
            attributes: ["id_membership"],
            include: [
              { model: User, attributes: ["id", "nickname", "imgURL"] },
            ],
          },
        ],
      },
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });

  return comments;
};

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

  let rating = await Rating.findOne({
    attributes: [[sequelize.fn("AVG", sequelize.col("value")), "rating"]],
    where: {
      trainerIdTrainer: trainerId,
      value: {
        [Op.gt]: 0,
      },
    },
  });

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
  return `Se actualizó el logo del entrenador  ${user.first_name} ${user.last_name}`;
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
        {
          model: PlanTrainee,
          where: { status: true },
          attributes: ["id_PlanTrainee", "name", "cost", "description"],
        },
      ],
      limit: limit,
      offset: (page - 1) * limit,
    });
    console.log(listTrainers);
    return listTrainers;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createPlan = async (id, idTrainee, datePlan, activities, aliments) => {
  console.log(datePlan);
  if (!datePlan)
    throw Error("Desbes ingresar la fecha a realizar la actividad");

  const finalDate = new Date(datePlan);

  const fecha = new Date();
  fecha.setDate(fecha.getDate() - 1);
  const fechaAyer = fecha.toISOString().substring(0, 10);

  const now = new Date(fechaAyer);
  console.log(finalDate, now, finalDate < now);

  aliments.map((aliment, index) => {
    if (!aliment.idAliment) throw Error(`El alimento ${index + 1} vacio`);
    if (!aliment.portion)
      throw Error(`La porcion del alimento ${index + 1} vacio`);
    if (!aliment.time) throw Error(`El tiempo del alimento ${index + 1} vacio`);
  });

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
  if (finalDate && finalDate < now)
    throw Error(`Desbes ingresar una fecha mayor o igual a la actual ${now}`);

  if (!activities.length) throw Error("Debes ingresar almenos una actividad");
  if (!aliments.length) throw Error("Debes ingresar almenos un alimento");

  activities.map((activity, index) => {
    if (!activity.idActivity) throw Error(`La actividad ${index + 1} vacia`);
    if (!activity.series)
      throw Error(`Las series de la actividad ${index + 1} vacia`);
    if (!activity.repetitions)
      throw Error(`Las repeticiones de la actividad ${index + 1} vacia`);
  });
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
  listComment,
  listTrainees2,
};
