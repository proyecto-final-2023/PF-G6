const { Router } = require("express");

const {
  botUserAdd,
  getId,
  getListUser,
  userByName,
  setVerify,
} = require("../controllers/userController");

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      userQuery = await userByName(name);
      res.status(200).json(userQuery);
    } else {
      const listUser = await getListUser();
      res.status(200).json(listUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//ruta para confirmar el mail
userRoutes.get("/confirm/:token", async (req, res) => {
  const {token}= req.params;
  const result=setVerify(token)
  try {
    res.status(200).send('E mail confirmado');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRoutes.get("/bot", async (req, res) => {
  try {
    const botUser = await botUserAdd();
    res.status(200).send(botUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getId(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // } catch (err) {
  //   next(err);
  // }
});

module.exports = userRoutes;
