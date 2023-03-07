const { Router } = require("express");
const {
  deleteComment,
  deleteMembership,
  updateLogo,
} = require("../controllers/adminControlers");

const adminRouter = Router();

adminRouter.delete("/comment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    activitiesQuery = await deleteComment(id);
    res.status(200).json(activitiesQuery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.delete("/membership/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(await deleteMembership(id));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

adminRouter.put("/logo/:id", async (req, res) => {
  const { logo } = req.body;
  const { id } = req.params;
  try {
    res.status(200).send(await updateLogo(id, logo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = adminRouter;
