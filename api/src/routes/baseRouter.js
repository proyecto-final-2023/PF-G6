const {Router} = require('express');


const baseRouter = Router();

baseRouter.get("/", (req, res)=>{
    res.send("prueba exitosa");
})


module.exports = baseRouter;

