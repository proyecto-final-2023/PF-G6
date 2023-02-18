const {Router} = require ('express');

const {sendContactMail} = require('../controllers/Mail/Config.mail');

const contactRoutes = Router();


contactRoutes.post("/", async (req, res)=>{
    const {name, email, subject, message} = req.body;
    const result= await sendContactMail(name, email,subject,message);
    if(result=='e-Mail enviado')res.status(200).json({result});

});


module.exports = contactRoutes;