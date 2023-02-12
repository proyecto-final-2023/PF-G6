const { Router } = require("express");
// Importar todos los routers;
const baseRouter = require("./baseRouter");
const activityRouter = require("./activityRoutes");

const indexRouter = Router();

// Configurar los routers
indexRouter.use("/base", baseRouter);
indexRouter.use("/activity", activityRouter);
indexRouter.use("/user", userRoutes);

module.exports = indexRouter;
