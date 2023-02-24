const { Router } = require("express");
const { postPlansTrainee } = require("../controllers/plansTraineeControlers");

const plansTraineeRouter = Router();

plansTraineeRouter.post("/", async (req, res) => {
  const { name, cost, description, idTrainer } = req.body;
  try {
    res
      .status(200)
      .send(await postPlansTrainee(name, cost, description, idTrainer));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// plansRouter.get("/trainers", async (req, res) => {
//   try {
//     res.status(200).send(await allPlans());
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

module.exports = plansTraineeRouter;
