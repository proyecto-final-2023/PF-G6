const { Router } = require("express");
const { generateMembership } = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.post("/", async (req, res) => {
  const { idUser, idPlan } = req.body;
  try {
    res.status(200).send(await generateMembership(idUser, idPlan));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = membershipRouter;
