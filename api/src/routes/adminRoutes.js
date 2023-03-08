const { Router } = require("express");
const {
  deleteComment,
  deleteMembership,
  updateLogo,
  listUser,
  listTrainers,
  addData,
  editLogo,
  listCommet,
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

adminRouter.get("/users", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listUser(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.get("/trainers", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listTrainers(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.put("/users", async (req, res) => {
  const { id, first_name, last_name, nickname, imgURL, gender, phone, email } =
    req.body;
  try {
    res
      .status(200)
      .send(
        await addData(
          id,
          first_name,
          last_name,
          nickname,
          imgURL,
          gender,
          phone,
          email
        )
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.put("/trainers", async (req, res) => {
  const { id, logo } = req.body;
  try {
    res.status(200).send(await editLogo(id, logo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.get("/comment", async (req, res) => {
  const { page } = req.query;
  try {
    res.status(200).send(await listCommet(page, 10));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = adminRouter;
