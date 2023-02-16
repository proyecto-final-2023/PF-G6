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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

activityRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await getId(id));
});

module.exports = activityRouter;
