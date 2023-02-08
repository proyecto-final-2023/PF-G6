const express = require('express');
const morgan = require('morgan');
const cors= require('cors');
const indexRouter = require('../routes/index')


const server = express();


server.use(morgan('dev'));
server.use(cors());

server.use(indexRouter)


module.exports = server;