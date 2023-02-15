const {Router} = require('express');



const authRouter = Router();

authRouter.get("/", (req, res)=>{
    try {
        res.status(200).send("prueba exitosa");
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})


module.exports = authRouter;