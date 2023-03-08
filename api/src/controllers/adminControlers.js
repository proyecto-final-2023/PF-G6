const {
  Comment,
  Membership,
  User,
  Plantrainer,
  PlanTrainee,
  Logueo,
  Trainer,
  Certificates,
  Trainee,
} = require("../db");

async function deleteComment(id) {
  const comment = await Comment.findByPk(id);
  if (!comment) throw Error("Comentario inexistente");
  const comments = await Comment.findByPk(id);
  await comment.destroy();
  return { comments };
}

const deleteMembership = async (id) => {
  const membership = await Membership.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name", "phone"],
        include: [{ model: Logueo, attributes: ["email"] }],
      },
      {
        model: PlanTrainee,
        attributes: ["name"],
      },
      {
        model: Plantrainer,
        attributes: ["name"],
      },
      {
        model: Trainer,
        include: [
          {
            model: PlanTrainee,
          },
        ],
      },
    ],
    attributes: ["userId", "id_membership", "startDate", "finishDate"],
  });

  const plansTrainer = membership.trainer.planTrainees;

  plansTrainer.forEach(async (plan) => {
    plan.status = false;
    await plan.save();
  });

  const x = membership.userId;
  const userM = await User.findByPk(x);
  userM.role = "user";
  await userM.save();
  try {
    await membership.destroy();
    return membership;
  } catch (error) {
    console.log(
      `Error eliminando membership ${membership.id_membership}: ${error}`
    );
  }

  return membership;
};

const updateLogo = async (id, logo) => {
  const trainer = await Trainer.findByPk(id, {
    include: [{ model: Membership }],
  });

  const user = await User.findByPk(trainer.membership.userId, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });
  if (!trainer) {
    throw new Error(`No se encontró al entrenador con ID ${id}.`);
  }

  // Actualizamos la propiedad `logo` del entrenador con el nuevo valor
  await trainer.update({ logo });

  // Devolvemos un mensaje de confirmación
  return `Se actualizó el logo del entrenador  ${user.first_name} ${user.last_name}`;
};

const listUser = async (page, limit) => {
  userList = await User.findAll({
    include: [{ model: Logueo }],
    limit: limit,
    offset: (page - 1) * limit,
  });
  return userList.map((user) => ({
    id: user.id,
    status: user.status,
    first_name: user.first_name,
    last_name: user.last_name,
    nickname: user.nickname,
    role: user.role,
    gender: user.gender,
    phone: user.phone,
    imgURL: user.imgURL,
    email: user.logueo.email,
    verify: user.logueo.verify,
  }));
};

const listTrainers = async (page, limit) => {
  userList = await User.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    where: { role: "trainer" },
    include: [
      { model: Logueo },
      {
        model: Membership,
        include: [
          {
            model: Trainer,
            // include: [
            //   {
            //     model: Certificates,
            //     attributes: [
            //       "id_certificates",
            //       "type",
            //       "name",
            //       "url",
            //       "description",
            //     ],
            //   },
            // ],
          },
        ],
      },
    ],
  });

  return userList.map((user) => ({
    id: user.id,
    membership: user.membership.id_membership,
    status: user.status,
    first_name: user.first_name,
    last_name: user.last_name,
    imgURL: user.imgURL,
    email: user.logueo.email,
    idTrainer: user.membership.trainer.id,
    logo: user.membership.trainer.logo,
    // certificates: user.membership.trainer.certificates,
  }));
};

const addData = async (
  id,
  first_name,
  last_name,
  nickname,
  imgURL,
  gender,
  phone,
  email
) => {
  const user = await User.findByPk(id, { include: [Logueo] });
  const logueo = await Logueo.findByPk(user.logueo.id_login);
  if (!user) {
    throw new Error(`No se encontró al usuario con ID ${id}.`);
  }
  if (!logueo) {
    throw new Error(`No se encontró al usuario con ID ${id}.`);
  }

  await user.update({
    first_name,
    last_name,
    nickname,
    imgURL,
    gender,
    phone,
  });
  const emailEdit = logueo.email;
  if (emailEdit !== email) {
    await logueo.update({
      email,
      verify: false,
    });
  }
  const userConfirm = await User.findByPk(id, { include: [Logueo] });
  return {
    id: userConfirm.id,
    status: userConfirm.status,
    first_name: userConfirm.first_name,
    last_name: userConfirm.last_name,
    nickname: userConfirm.nickname,
    role: userConfirm.role,
    gender: userConfirm.gender,
    phone: userConfirm.phone,
    imgURL: userConfirm.imgURL,
    email: userConfirm.logueo.email,
    verify: userConfirm.logueo.verify,
  };
};

const editLogo = async (id, logo) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
      {
        model: Logueo,
      },
    ],
  });
  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer);
  if (!trainer) {
    throw new Error(`No se encontró al entrenador con ID ${id}.`);
  }

  await trainer.update({ logo });
  const userConfirm = await User.findByPk(id, {
    include: [
      { model: Logueo },
      {
        model: Membership,
        include: [
          {
            model: Trainer,
          },
        ],
      },
    ],
  });

  return {
    id: userConfirm.id,
    idTrainer: userConfirm.membership.trainer.id_trainer,
    status: userConfirm.status,
    first_name: userConfirm.first_name,
    last_name: userConfirm.last_name,
    imgURL: userConfirm.imgURL,
    email: userConfirm.logueo.email,
    idTrainer: userConfirm.membership.trainer.id,
    logo: userConfirm.membership.trainer.logo,
  };
};

const listCommet = async (page, limit) => {
  const listCom = await Comment.findAll({
    attributes: ["id", "traineeIdTrainee", "message", "trainerIdTrainer"],
    include: [Trainee, Trainer],
    limit: limit,
    offset: (page - 1) * limit,
  });

  const result = [];
  for await (const comment of listCom) {
    const trainee = await User.findByPk(comment.trainee.userId);
    const trainer = await User.findByPk(comment.trainer.userId);
    const commentData = {
      id: comment.id,
      trainee: trainee.nickname,
      fotoTrainee: trainee.imgURL,
      message: comment.message,
      trainer: trainer.nickname,
      fotoTrainer: trainer.imgURL,
    };
    result.push(commentData);
  }

  return result;
};

module.exports = {
  deleteComment,
  deleteMembership,
  updateLogo,
  listUser,
  listTrainers,
  addData,
  editLogo,
  listCommet,
};
