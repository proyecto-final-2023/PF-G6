const { Membership, User, Plantrainer } = require("../db");
const moment = require("moment");

const generateMembership = async (idUser, idPlan) => {
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
  await membership.setUser(idUser);
  await membership.setPlantrainer(idPlan);
  const userM = await User.findByPk(idUser);
  const planM = await Plantrainer.findByPk(idPlan);
  return `Felicidades ${userM.first_name}  ${userM.last_name} acabas de adquirir el plan ${planM.name}`;
};

module.exports = { generateMembership };
