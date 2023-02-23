const { Router } = require("express");
const { createTrainer}= require('../controllers/trainerController');





const trainerRoutes = Router();


trainerRoutes.post("/", async (req, res)=>{
    const {logo}= req.body;
    try {
        res.status(200).send(createTrainer)
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})