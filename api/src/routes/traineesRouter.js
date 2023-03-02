const { Router } = require("express");
const {
  listTrainees,
  listTraineesbyPlan,
} = require("../controllers/traineeControlers");

const traineeRouter = Router();

traineeRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listTrainees(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

traineeRouter.get("/byplan", async (req, res) => {
  const { idPlanTrainee } = req.body;
  const { page } = req.query;
  try {
    res.status(200).send(await listTraineesbyPlan(idPlanTrainee, page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = traineeRouter;
