const {
  Membership,
  User,
  Plantrainer,
  PlanTrainee,
  Logueo,
  Trainer,
  Voucher,
} = require("../db");
const moment = require("moment");

const generateMembership = async (idUser, idPlan, idPago, cost, fechaPago) => {
  console.log("idUser", idUser, idPlan, idPago, cost, fechaPago);

  try {
    if (!idUser || !idPlan) {
      throw Error("Parametros Invalidos");
    }
    const userM = await User.findByPk(idUser);
    const planM = await Plantrainer.findByPk(idPlan);
    if (!userM || !planM) {
      throw Error("Parametros Invalidos");
    }

    const startDate = moment().format("YYYY-MM-DD");
    const start = moment(startDate);
    const finish = start.add(1, "month");

    if (start.month() === 11) {
      finish.add(1, "year");
    }

    const finishDate = finish.format("YYYY-MM-DD");

    const membership = await Membership.create({
      startDate,
      finishDate,
      userId: userM.id,
    });

    await membership.setUser(idUser);
    await membership.setPlantrainer(idPlan);

    console.log("x", membership.id_membership);
    const trainerM = await Trainer.create({});
    await trainerM.setMembership(membership.id_membership);
    console.log(trainerM);
    userM.role = "trainer";
    await userM.save();

    const voucher = await Voucher.create({
      id_voucher: idPago,
      date: fechaPago,
      cost: cost,
    });
    await membership.setVoucher(voucher);

    return `Felicidades ${userM.first_name}  ${userM.last_name} acabas de adquirir el plan ${planM.name}`;
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

module.exports = { generateMembership, getMembership };
