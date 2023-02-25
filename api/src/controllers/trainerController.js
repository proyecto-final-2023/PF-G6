const { Trainer } = require("../db");


const createTrainer= async (idUser, logo)=>{
    const cTrainer = await Trainer.create({logo});
    cTrainer.setUser(idUser)
    return cTrainer;
}

module.exports = {createTrainer}