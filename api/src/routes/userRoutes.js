const { Router } = require("express");
const { botUserAdd } = require("../controllers/userController");

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  try {
    res.status(200).send("Devuelvo el usuario");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRoutes.get("/bot", async (req, res) => {
  try {
    const botUser = await botUserAdd();
    res.status(200).send(botUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = userRoutes;
