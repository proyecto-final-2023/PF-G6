const {Router} = require('express');
const baseRouter = require('./baseRouter')


const indexRouter = Router();

indexRouter.use('/base', baseRouter);



module.exports = indexRouter;