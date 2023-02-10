const { exercices } = require("./exercices");
//Esta funcion extrae los datos de la api
const extractData = async () => {
  try {
    const result = exercices.map((ex) => {
      return {
        id: ex.id,
        name: ex.name,
        bodyPart: ex.bodyPart,
        equipment: ex.equipment,
        gifUrl: ex.gifUrl,
        target: ex.target,
      };
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { extractData };
