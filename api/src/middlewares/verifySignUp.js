const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../db");

//verifica que tenga token, usada para rutas de guest

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no se recibió token" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user) next();
  else return res.status(403).json({ message: "Usuario no existe" });
};

//verifica que tenga token y que el usuario sea trainee
const verifyTrainee = async (req, res, next) =>{
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no se recibió token" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user.rol === 'trainee') next();
  else return res.status(403).json({ message: "rol no permitido" });
}

//verifica que tenga token y sea un trainer
const verifyTrainer = async (req, res, next) =>{
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no se recibió token" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user.rol === 'trainer') next();
  else return res.status(403).json({ message: "rol no permitido" });
}


//verifica que tenga token y rol de admin
const verifyAdmin = async (req, res, next) =>{
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no se recibió token" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user.rol === 'admin') next();
  else return res.status(403).json({ message: "rol no permitido" });
}

module.exports = { verifyToken, verifyTrainer, verifyTrainee, verifyAdmin };
