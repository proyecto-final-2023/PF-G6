const { Router } = require("express");
const {
  exercicesFilter,
  getListActivities,
  getId,
  activityByName,
} = require("../controllers/activityController");

const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      activitiesQuery = await activityByName(name);
      res.status(200).json(activitiesQuery);
    } else {
      const listActivities = await getListActivities();
      res.status(200).json(listActivities);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

activityRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await getId(id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // } catch (err) {
  //   next(err);
  // }
});

activityRouter.get("/filter/:type/:parameter", async (req, res, next) => {
  try {
    const { type, parameter } = req.params;
    const exerFilter = await exercicesFilter(type, parameter);
    res.status(200).json(exerFilter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = activityRouter;
