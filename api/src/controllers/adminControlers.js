const {
  Comment,
  Membership,
  User,
  Plantrainer,
  PlanTrainee,
  Logueo,
  Trainer,
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

module.exports = { deleteComment, deleteMembership, updateLogo };
