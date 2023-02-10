const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");

require("./db.js");
const server = express();
server.name = "pf";

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/", indexRouter);

module.exports = server;
