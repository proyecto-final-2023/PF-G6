const { Router } = require("express");
// Importar todos los routers;
const baseRouter = require("./baseRouter");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const createUserRoutes = require("./createUserRoutes");
const contactRoutes = require("./contactRoutes");
const plansRouter = require("./plansRoutes");
const membership = require("./membershipRoutes");
//----------------------------------------------------------
const activityRouter = require("./activityRoutes");
const alimentRouter = require("./alimentsRoutes");
//------------------------------------------------------------------
const errorHandler = require("../middlewares/errorHandler ");
const { verifyToken } = require("../middlewares/verifySignUp.js");

const indexRouter = Router();

// Configurar los routers
indexRouter.use(errorHandler);
indexRouter.use("/base", verifyToken, baseRouter);
indexRouter.use("/activity", activityRouter);
indexRouter.use("/aliment", alimentRouter);
indexRouter.use("/user", userRoutes);
indexRouter.use("/auth", authRoutes);
indexRouter.use("/createuser", createUserRoutes);
indexRouter.use("/contact", contactRoutes);
indexRouter.use("/plans", plansRouter);
indexRouter.use("/membership", membership);

module.exports = indexRouter;
