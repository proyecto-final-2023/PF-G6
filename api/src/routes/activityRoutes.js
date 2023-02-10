const { Router } = require("express");
const { getListActivities } = require("../controllers/activityController");

const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  try {
    const listActivities = await getListActivities();
    res.status(200).json(listActivities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = activityRouter;
