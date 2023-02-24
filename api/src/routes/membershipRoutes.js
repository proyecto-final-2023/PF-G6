const { Router } = require("express");
const {
  generateMembership,
  getMembership,
} = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.post("/", async (req, res) => {
  const { idUser, idPlan } = req.body;
  try {
    res.status(200).send(await generateMembership(idUser, idPlan));
  } catch (error) {
    // if (error.name === "SequelizeUniqueConstraintError") {
    //   console.log(error.name);
    //   res.status(400).send({ error: "Usted ya tiene un plan Activado" });
    // }
    res.status(400).send({ error: error.message });
  }
});

membershipRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(await getMembership(id));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = membershipRouter;
