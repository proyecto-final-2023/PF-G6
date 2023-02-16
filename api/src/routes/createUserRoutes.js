const { Router } = require("express");
const { signUP } = require("../controllers/authControlers");

const createUserRouter = Router();

createUserRouter.post("/", async (req, res) => {
  const obj = req.body;
  try {
    res.status(200).send(await signUP(obj));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = createUserRouter;
