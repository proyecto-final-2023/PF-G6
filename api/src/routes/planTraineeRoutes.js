const { Router } = require("express");
const { postPlansTrainee } = require("../controllers/plansTraineeControlers");
const { idExtract } = require("../middlewares/verifySignUp");
const plansTraineeRouter = Router();

plansTraineeRouter.post("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  const idUser = await idExtract(token);
  const { name, cost, description } = req.body;
  try {
    res
      .status(200)
      .send(await postPlansTrainee(name, cost, description, idUser));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = plansTraineeRouter;
