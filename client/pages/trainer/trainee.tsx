import axios from 'axios'
import {useState,useEffect} from 'react'
import { getCookie, setCookie } from "@/utils/cookieHandler";


export default function trainee() {
    const key =getCookie('token')
    console.log(key)
    useEffect(()=>{
  axios.post('http://localhost:3001/user/perfil',null,{headers:{'x-access-token': key}})
  .then((data)=>{
    console.log(data.data)
  })
  .catch(error=>
    console.log(error));
  
  
    },[])
  return (
    <div>
       trainees
    </div>
  )
}
