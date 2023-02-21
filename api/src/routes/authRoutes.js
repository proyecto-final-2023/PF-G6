const {Router} = require('express');
const {signIn} = require('../controllers/authControlers')


const authRouter = Router();
//Ruta para loguear un usuario y devuelve el token

authRouter.post("/", async (req, res)=>{
    const obj= req.body;
    try {
        res.status(200).send(await signIn(obj.email, obj.password));
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})


module.exports = authRouter;