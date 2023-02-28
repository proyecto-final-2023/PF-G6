const { Router } = require("express");
// Importar todos los routers;
const baseRouter = require("./baseRouter");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const createUserRoutes = require("./createUserRoutes");
const contactRoutes = require("./contactRoutes");
const plansRouter = require("./plansRoutes");
const plansTraineeRouter = require("./planTraineeRoutes");
const membership = require("./membershipRoutes");
const trainers = require("./trainersRouters");
//----------------------------------------------------------
const activityRouter = require("./activityRoutes");
const alimentRouter = require("./alimentsRoutes");
//------------------------------------------------------------------
const errorHandler = require("../middlewares/errorHandler ");
const { verifyToken } = require("../middlewares/verifySignUp.js");

const indexRouter = Router();

// Configurar los routers
indexRouter.use(errorHandler);
indexRouter.use("/base", verifyToken, baseRouter);// check
indexRouter.use("/user", userRoutes); // check
indexRouter.use("/activity", activityRouter);
indexRouter.use("/aliment", alimentRouter);
indexRouter.use("/auth", authRoutes);
indexRouter.use("/createuser", createUserRoutes);
indexRouter.use("/contact", contactRoutes);
indexRouter.use("/plans/trainers", plansRouter);
indexRouter.use("/plans/trainee", plansTraineeRouter);
indexRouter.use("/membership", membership);
indexRouter.use("/trainers", trainers);// check

module.exports = indexRouter;
