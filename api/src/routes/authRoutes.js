const { Router } = require("express");
const { signIn, signInAndCreate } = require("../controllers/authControlers");

const authRouter = Router();
//Ruta para loguear un usuario y devuelve el token

authRouter.post("/", async (req, res) => {
  const obj = req.body;
  try {
    res.status(200).send(await signIn(obj.email, obj.password, obj.authExtern));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

authRouter.post("/ext", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    res
      .status(200)
      .send(await signInAndCreate(first_name, last_name, email, password));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = authRouter;
