const { Router } = require("express");
const {
  generateMembership,
  getMembership,
} = require("../controllers/membershipController");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const membershipRouter = Router();

membershipRouter.post("/", async (req, res) => {
  try {
    const { idPlan, status, idPago, cost, fechaPago } = req.body;
    const token = req.headers["x-access-token"];
    const idUser = jwt.verify(token, config.SECRET).id;
    if (status === "COMPLETED") {
      res
        .status(200)
        .send(
          await generateMembership(idUser, idPlan, idPago, cost, fechaPago)
        );
    } else {
      res.status(404).send("El pago no a sido completado");
    }
  } catch (error) {
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
