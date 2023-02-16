const { Router } = require("express");
const {
  getListActivities,
  getId,
} = require("../controllers/activityController");

const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  try {
    const listActivities = await getListActivities();
    res.status(200).json(listActivities);
  } catch (err) {
    next(err);
  }
});

activityRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      const error = new Error("Ejercicio inexistente");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
});

module.exports = activityRouter;
