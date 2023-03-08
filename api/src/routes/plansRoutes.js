const { Router } = require("express");
const {
  postPlansTrainer,
  allPlans,
  putPlansTrainer,
} = require("../controllers/plansTrainerControlers");

const plansRouter = Router();

plansRouter.post("/", async (req, res) => {
  const { name, cost, description, cantTrainees } = req.body;
  try {
    res
      .status(200)
      .send(await postPlansTrainer(name, cost, description, cantTrainees));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

plansRouter.put("/", async (req, res) => {
  const { id, name, cost, description, cantTrainees } = req.body;
  try {
    res
      .status(200)
      .send(await putPlansTrainer(id,name, cost, description, cantTrainees));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

plansRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await allPlans(page));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = plansRouter;
