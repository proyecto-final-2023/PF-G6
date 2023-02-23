const { Router } = require("express");




const trainerRoutes = Router();


trainerRoutes.post("/", async (req, res)=>{
    const {logo}= req.body;
    try {
        res.status(200).send('prueba de trainer')
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})