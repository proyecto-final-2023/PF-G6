const { Router } = require("express");
const { getListAliments } = require("../controllers/alimentsController");

const alimentsRouter = Router();

alimentsRouter.get("/", async (req, res) => {
  try {
    const listAliments = await getListAliments();
    res.status(200).json(listAliments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = alimentsRouter;
