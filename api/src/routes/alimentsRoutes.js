const { Router } = require("express");
const {
  getListAliments,
  getId,
  alimentFilter,
} = require("../controllers/alimentsController");

const alimentsRouter = Router();

alimentsRouter.get("/", async (req, res) => {
  try {
    const listAliments = await getListAliments();
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
  // } catch (err) {
  //   next(err);
  // }
});

alimentsRouter.get("/filter/:type/:parameter", async (req, res, next) => {
  try {
    const { type, parameter } = req.params;
    const aliFilter = await alimentFilter(type, parameter);
    res.status(200).json(aliFilter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = alimentsRouter;
