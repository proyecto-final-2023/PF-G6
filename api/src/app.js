const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const checkMembership = require("./controllers/membershipController");

const MEMBERSHIP_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
setInterval(() => {
  checkMembership((action = "delete"));
}, MEMBERSHIP_CHECK_INTERVAL);

require("./db.js");
const server = express();
server.name = "pf";

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/", indexRouter);

module.exports = server;
