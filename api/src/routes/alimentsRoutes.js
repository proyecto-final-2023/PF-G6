const { Router } = require("express");
const {
  getListAliments,
  getId,
  alimentFilter,
  alimentByName,
} = require("../controllers/alimentsController");

const alimentsRouter = Router();

alimentsRouter.get("/", async (req, res) => {
  const { page, name } = req.query;
  try {
    if (name) {
      alimentQuery = await alimentByName(name, page);
      res.status(200).json(alimentQuery);
    } else {
      const listAliments = await getListAliments(page, 10);
      res.status(200).json(listAliments);
    }
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
    const { page } = req.query;
    const { min, max } = req.body;
    const { type } = req.params;
    const aliFilter = await alimentFilter(type, page, 10, min, max);
    res.status(200).json(aliFilter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = alimentsRouter;
