import axios from "axios"
const PostAuth=(first_name,last_name,nick_name,email,password,rol,imgURL,authExtern)=>{

axios.post('/auth',async(req,res)=> {
 const attributes ={first_name,last_name,nick_name,email,password,rol,imgURL,authExtern}
 attributes=req.body
  .then(function (response) {
    console.log("enviado");
  })
  .catch(function (error) {
    console.log("no se envio");
  });
})}