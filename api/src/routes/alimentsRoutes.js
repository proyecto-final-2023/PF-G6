const { Router } = require("express");
const {
  getListAliments,
  getId,
  alimentFilter,
} = require("../controllers/alimentsController");

const alimentsRouter = Router();

alimentsRouter.get("/", async (req, res) => {
  const { page, limit } = req.body;
  try {
    const listAliments = await getListAliments(page, limit);
    res.status(200).json(listAliments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

alimentsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const aliment = await getId(id);
    res.status(200).json(aliment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

alimentsRouter.get("/filter/:type/", async (req, res, next) => {
  try {
    const { page, pageSize, min, max } = req.body;
    const { type } = req.params;
    const aliFilter = await alimentFilter(type, page, pageSize, min, max);
    res.status(200).json(aliFilter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = alimentsRouter;
