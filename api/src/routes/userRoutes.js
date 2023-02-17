const { Router } = require("express");
const { botUserAdd, setVerify } = require("../controllers/userController");

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


//ruta para confirmar el mail
userRoutes.get("/confirm/:token", async (req, res) => {
  const token= req.params;
  const result=setVerify(token)
  try {
    res.status(200).send('E mail confirmado');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = userRoutes;
