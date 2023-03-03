const { Router } = require("express");
const {
  listTrainees,
  listTraineesbyPlan,
  addData,
} = require("../controllers/traineeControlers");
const { idExtract } = require("../middlewares/verifySignUp");

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

traineeRouter.put("/data", async (req, res) => {
  const {
    weight,
    height,
    neck,
    torso,
    chest,
    waist,
    arm,
    wrist,
    hip,
    butt,
    thig,
    calf,
    allergies,
    surgeries,
    smoke,
    drinker,
    drugs,
    roids,
    water,
    lesions,
  } = req.body;
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res
      .status(200)
      .send(
        await addData(
          id,
          weight,
          height,
          neck,
          torso,
          chest,
          waist,
          arm,
          wrist,
          hip,
          butt,
          thig,
          calf,
          allergies,
          surgeries,
          smoke,
          drinker,
          drugs,
          roids,
          water,
          lesions
        )
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = traineeRouter;
