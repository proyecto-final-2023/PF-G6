const { Router } = require("express");
// Importar todos los routers;
const baseRouter = require("./baseRouter");
const activityRouter = require("./activityRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const createUserRoutes= require("./createUserRoutes");
const {verifyToken} = require('../middlewares/verifySignUp.js');

const indexRouter = Router();

// Configurar los routers
indexRouter.use("/base", verifyToken, baseRouter);
indexRouter.use("/activity", activityRouter);
indexRouter.use("/user", userRoutes);
indexRouter.use("/auth", authRoutes);
indexRouter.use("/createuser", createUserRoutes);

module.exports = indexRouter;
