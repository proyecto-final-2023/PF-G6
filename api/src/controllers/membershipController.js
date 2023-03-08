const {
  Membership,
  User,
  Plantrainer,
  PlanTrainee,
  Logueo,
  Trainer,
  Trainee,
  Voucher,
  SocialNetworks,
  Certificates,
  Rating,
} = require("../db");
const moment = require("moment");


  try {
    let member = [];
    const memberships = await Membership.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name", "phone"],
          include: [{ model: Logueo, attributes: ["email"] }],
        },
        {
          model: Plantrainer,
          attributes: ["name"],
        },
        {
          model: PlanTrainee,
          attributes: ["name"],
        },
      ],
      attributes: ["userId", "id_membership", "startDate", "finishDate"],
    });
    memberships.forEach(async (membership) => {
      const membershipx = await Membership.findByPk(membership.id_membership, {
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

      const plansTrainerx =
        membershipx.trainer && membershipx.trainer.planTrainees
          ? membershipx.trainer.planTrainees
          : [];

      plansTrainerx.forEach(async (plan) => {
        plan.status = false;
        await plan.save();
      });

      const { finishDate, id_membership } = membership;
      const finalDate = new Date(finishDate);
      const now = new Date();
      if (action === "delete") {
        if (finalDate && finalDate < now) {
          console.log(`Se elimino ${id_membership}`);
          const x = membership.userId;
          const userM = await User.findByPk(x);
          member.push(userM);
          userM.role = "user";
          await userM.save();
          try {
            await membership.destroy();
          } catch (error) {
            console.log(
              `Error eliminando membership ${membership.id_membership}: ${error}`
            );
          }

        }
      }
      if (action === "view") {
        if (finalDate && finalDate < now) {
          member.push(membership);
        }
      }
    });
    if (member.length) return member;

    return "Hoy no hay planes que terminen";
  } catch (error) {
    return error;
  }
};

//--------------------------------------------------------------------------------------------------------------------
const generateMembership = async (idUser, idPlan, idPago, cost, fechaPago) => {
  try {
    const userM = await User.findByPk(idUser);
    const planM = await Plantrainer.findByPk(idPlan);
    const planM2 = await PlanTrainee.findByPk(idPlan, {
      include: [
        {
          model: Trainer,
          attributes: ["id_trainer"],
          include: [
            {
              model: Membership,
              attributes: ["id_membership"],
              include: [
                {
                  model: Plantrainer,
                },
                {
                  model: User,
                },
              ],
            },
          ],
        },
      ],
    });

    const startDate = moment().format("YYYY-MM-DD");
    const start = moment(startDate);

    if (start.month() === 11) {
      finishTrainer.add(1, "year");
    }

    if (planM) {
      const finishTrainer = start.add(1, "month");
      const finishDate = finishTrainer.format("YYYY-MM-DD");
      const trainerE = await Trainer.findOne({ where: { userId: userM.id } });

      if (trainerE) {
        const membership = await Membership.create({
          startDate,
          finishDate,
          userId: userM.id,
        });
        await membership.setUser(idUser);
        await membership.setPlantrainer(idPlan);
        await trainerE.setMembership(membership.id_membership);
        userM.role = "trainer";
        await userM.save();

        const voucher = await Voucher.create({
          id_voucher: idPago,
          date: startDate,
          cost: cost,
        });
        await membership.setVoucher(voucher);
      } else {
        const membership = await Membership.create({
          startDate,
          finishDate,
          userId: userM.id,
        });
        await membership.setUser(idUser);
        await membership.setPlantrainer(idPlan);

        const trainerM = await Trainer.create({
          userId: userM.id,
          logo: "https://scontent.fltx1-1.fna.fbcdn.net/v/t39.30808-6/334673426_772243250907245_3875854903215741851_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=rHs8wABecEoAX-sdVE2&_nc_ht=scontent.fltx1-1.fna&oh=00_AfDp7rc1sfM81JnuPY6KbpuA0U8JyR35nkFC_UT-5jaKCg&oe=640BDF37",
        });

        await trainerM.setMembership(membership.id_membership);
        userM.role = "trainer";
        await userM.save();

        const voucher = await Voucher.create({
          id_voucher: idPago,
          date: startDate,
          cost: cost,
        });
        await membership.setVoucher(voucher);
        // await userM.setVoucher(trainerM);
      }
      return `Felicidades ${userM.first_name}  ${userM.last_name} acabas de adquirir el plan ${planM.name}`;
    }

    if (planM2) {
      const cantTrainees = planM2.trainer.membership.plantrainer.cantTrainees;
      const idTrainer = planM2.trainerIdTrainer;
      const plansT = await PlanTrainee.findAll({
        where: {
          trainerIdTrainer: idTrainer,
        },
        include: [{ model: Membership }],
      });
      let count = 0;
      for (let plan of plansT) {
        const membershipCount = await plan.countMemberships();
        count += membershipCount;
      }
      //--------------------------------------------------------------------------------------------------------
      if (count < cantTrainees) {
        const finishTrainee = start.add(7, "day");
        const finishDate = finishTrainee.format("YYYY-MM-DD");

        const trainerE = await Trainee.findOne({ where: { userId: userM.id } });

        if (trainerE) {
          const membership = await Membership.create({
            startDate,
            finishDate,
            userId: userM.id,
          });

          await membership.setUser(idUser);
          await membership.setPlanTrainee(idPlan);
          await trainerE.setMembership(membership.id_membership);
          userM.role = "trainee";
          await userM.save();
          const voucher = await Voucher.create({
            id_voucher: idPago,
            date: startDate,
            cost: cost,
          });
          await membership.setVoucher(voucher);
        } else {
          const membership = await Membership.create({
            startDate,
            finishDate,
            userId: userM.id,
          });
          await membership.setUser(idUser);
          await membership.setPlanTrainee(idPlan);
          const trainerM = await Trainee.create({
            userId: userM.id,
          });

          await trainerM.setMembership(membership.id_membership);
          userM.role = "trainee";
          await userM.save();
          const voucher = await Voucher.create({
            id_voucher: idPago,
            date: startDate,
            cost: cost,
          });
          await membership.setVoucher(voucher);
          const rating = await Rating.create({
            value: 0,
            traineeIdTrainee: trainerM.id_trainee,
            trainerIdTrainer: planM2.trainerIdTrainer,
          });
        }

        return `Felicidades ${userM.first_name}  ${userM.last_name} acabas de adquirir el plan ${planM2.name}`;
      } else {
        const nameTrainer =
          planM2.trainer.membership.user.first_name +
          " " +
          planM2.trainer.membership.user.last_name;
        throw `El Trainer ${nameTrainer} ya no tiene cupos para mas Trainees`;
      }
    }
  } catch (error) {
    const userM = await User.findByPk(idUser);
    if (error.name === "SequelizeUniqueConstraintError") {
      return `Lo sentimos ${userM.first_name}  pero ya tienes un plan Activo`;
    }
    return error;
  }
};

const getMembership = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await Membership.findByPk(id, {
    attributes: ["startDate", "finishDate"],
    include: [
      {
        model: User,
        include: [{ model: Logueo, attributes: ["email"] }],
        attributes: ["id", "first_name", "last_name", "imgURL", "role"],
      },
      {
        model: Plantrainer,
        attributes: ["name", "cost", "category"],
      },
    ],
  });
  if (!dataValues) throw new Error("Membresia inexistente");

  return dataValues;
};

module.exports = { generateMembership, getMembership, checkMembership };
