const {Router} = require('express');



const createUserRouter = Router();

createUserRouterRouter.get("/", (req, res)=>{
    try {
        res.status(200).send("usuario creado");
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})


module.exports = baseRouter;