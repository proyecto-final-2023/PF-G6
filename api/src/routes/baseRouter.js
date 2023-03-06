const { Router } = require("express");

const baseRouter = Router();

baseRouter.get("/", (req, res) => {
  const token = req.headers["x-access-token"];
  console.log(token)
  try {
    res.status(200).send("prueba exitosa");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

baseRouter.post("/", (req, res) => {
  try {
    res.status(200).send("prueba POST-exitosa");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = baseRouter;
