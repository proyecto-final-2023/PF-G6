const {Router} = require('express');


const userRoutes = Router();

baseRouter.get("/", (req, res)=>{
    try {
        res.status(200).send("Devuelvo el usuario");
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

module.exports = {userRoutes}