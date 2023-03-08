const { Router } = require("express");
const { idExtract } = require("../middlewares/verifySignUp");

const {
  botUserAdd,
  getId,
  getListUser,
  userByName,
  setVerify,
  getPerfil,
  listEmail,
  addData,
  statusAlter,

  ratingTotal,
  listComment,

} = require("../controllers/userController");

const { token } = require("morgan");

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const { name, page } = req.query;
  try {
    if (name) {
      userQuery = await userByName(name, page, 10);
      res.status(200).json(userQuery);
    } else {
      const listUser = await getListUser(page);
      res.status(200).json(listUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//ruta para confirmar el mail
userRoutes.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;
  const result = setVerify(token);
  try {
    res.status(200).send("E mail confirmado");
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

userRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getId(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRoutes.post("/email", async (req, res) => {
  const { email } = req.body;
  try {
    const verify = await listEmail(email);
    res.status(200).json(verify);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRoutes.post("/perfil", async (req, res) => {
  try {
    const id = await idExtract(req.headers["x-access-token"]);
    const user = await getPerfil(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRoutes.put("/data", async (req, res) => {
  const { first_name, last_name, nickname, imgURL, gender, phone } = req.body;
  const id = await idExtract(req.headers["x-access-token"]);
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
          phone
        )
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


userRoutes.get("/status/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const user = await statusAlter(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


userRoutes.get("/comment/:id", async (req, res) => {
  const { page } = req.query;
  const { id } = req.params;

  try {
    res.status(200).send(await listComment(id, page, 5));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRoutes.get("/rating/:id", async (req, res) => {
  const idL = await idExtract(req.headers["x-access-token"]);
  const { id } = req.params;
  try {
    res.status(200).send(await ratingTotal(id, idL));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = userRoutes;
