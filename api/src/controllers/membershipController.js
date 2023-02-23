const { Membership, User, Plantrainer, Logueo, Trainer } = require("../db");
const moment = require("moment");

const generateMembership = async (idUser, idPlan) => {
  if (!idUser || !idPlan) {
    throw Error("Parametros Invalidos");
  }
  const userM = await User.findByPk(idUser);
  const planM = await Plantrainer.findByPk(idPlan);
  if (!userM || !planM) {
    throw Error("Parametros Invalidos");
  }
  // Obtener la fecha actual
  const startDate = moment().format("YYYY-MM-DD");
  // Crear un objeto de fecha utilizando moment con la fecha actual.
  const start = moment(startDate);
  // Agregar un mes a la fecha actual.
  const finish = start.add(1, "month");

  // Si el mes actual es diciembre, cambiar el año a siguiente año.
  if (start.month() === 11) {
    // Diciembre tiene índice 11 en moment.
    finish.add(1, "year");
  }

  // Obtener la fecha del siguiente mes en el formato deseado.
  const finishDate = finish.format("YYYY-MM-DD");
  const membership = await Membership.create({
    startDate,
    finishDate,
  });

  const trainerM = await Trainer.create({});

  await trainerM.setPlantrainer(idPlan);

  await membership.setUser(idUser);
  await membership.setPlantrainer(idPlan);

  return `Felicidades ${userM.first_name}  ${userM.last_name} acabas de adquirir el plan ${planM.name}`;
};

const getMembership = async (id) => {
  if (!id) throw new Error("Debe ingresar una ID válida");

  const dataValues = await Membership.findByPk(id, {
    attributes: ["startDate", "finishDate"],
    include: [
      {
        model: User,
        include: [{ model: Logueo, attributes: ["email"] }],
        attributes: ["first_name", "last_name", "imgURL", "role"],
      },
      {
        model: Plantrainer,
        attributes: ["name", "cost", "category"],
      },
    ],
  });
  if (!dataValues) throw new Error("Usuario inexistente");
  // Modificar el valor del campo role del objeto user
  dataValues.user.role = "Trainer";

  return dataValues;
};

module.exports = { generateMembership, getMembership };