const { Router } = require("express");
const {
  listTrainers,
  addCertificate,
  addSocial,
  addLogo,
  createPlan,
  ratingTotal,
  listComment,
} = require("../controllers/trainersController");
const { idExtract } = require("../middlewares/verifySignUp");

const trainerRouter = Router();

trainerRouter.get("/comment", async (req, res) => {
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res.status(200).send(await listComment(id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.get("/rating", async (req, res) => {
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res.status(200).send(await ratingTotal(id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listTrainers(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.post("/certificates", async (req, res) => {
  const { type, name, url, description } = req.body;
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res
      .status(200)
      .send(await addCertificate(id, type, name, url, description));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.post("/social", async (req, res) => {
  const { name, url } = req.body;
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res.status(200).send(await addSocial(id, name, url));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.put("/logo", async (req, res) => {
  const { logo } = req.body;
  const id = await idExtract(req.headers["x-access-token"]);
  try {
    res.status(200).send(await addLogo(id, logo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

trainerRouter.post("/plan", async (req, res) => {
  const { idTrainee, datePlan, activities, aliments } = req.body;
  try {
    const id = await idExtract(req.headers["x-access-token"]);
    res
      .status(200)
      .json(await createPlan(id, idTrainee, datePlan, activities, aliments));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = trainerRouter;
