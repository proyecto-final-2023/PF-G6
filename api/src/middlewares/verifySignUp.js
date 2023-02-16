const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../db");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no se recibió token" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findByPk(decoded.id);

  if (user) next();
  else return res.status(403).json({ message: "Usuario no existe" });
};

module.exports = { verifyToken };
