const { Router } = require("express");
// Importar todos los routers;
const baseRouter = require("./baseRouter");
const activityRouter = require("./activityRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const indexRouter = Router();

// Configurar los routers
indexRouter.use("/base", baseRouter);
indexRouter.use("/activity", activityRouter);
indexRouter.use("/user", userRoutes);
indexRouter.use("/auth", authRoutes);

module.exports = indexRouter;
