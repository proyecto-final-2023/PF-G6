const { Router } = require("express");
const { listTrainers } = require("../controllers/trainersController");

const trainerRouter = Router();

trainerRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listTrainers(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = trainerRouter;
