const { Router } = require("express");
const {
  postPlansTrainer,
  allPlans,
} = require("../controllers/plansTrainerControlers");

const plansRouter = Router();

plansRouter.post("/trainers", async (req, res) => {
  const { name, cost, category, description, cantTrainees } = req.body;
  try {
    res
      .status(200)
      .send(
        await postPlansTrainer(name, cost, category, description, cantTrainees)
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

plansRouter.get("/trainers", async (req, res) => {
  try {
    res.status(200).send(await allPlans());
  } catch (error) {
  
    res.status(400).send({ error: error.message });
  }
});

module.exports = plansRouter;
