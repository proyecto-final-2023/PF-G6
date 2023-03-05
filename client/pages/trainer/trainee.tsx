import axios from 'axios'
import {useEffect, useState} from 'react'
import { getCookie, setCookie } from "@/utils/cookieHandler";
import CardTraineePlans from '@/components/CardTraineePlans';


export default function trainee() {
  const[user,setData]=useState([])
  const[userId,setDataId]=useState([])
  const key =getCookie('token')
  console.log(key)
  const data= {
    idPlanTrainee: "40220401-f833-46c9-9212-8e3352331ec3"
  }
  
   
    // se hace un post para ver los trainners con plans 
    useEffect(()=>{
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trainees/byplan?page=1`, data)
      .then((data:any)=>{
        console.log(data.data)
         setData(data.data.memberships.map((e:any)=>e.user))
         axios
         .post("http://localhost:3001/user/perfil", null, {
           headers: { "x-access-token": key },
         })
         .then((data) => {
           console.log(data.data);
           setDataId(data.data);
           
         })
         .catch((error) => console.log(error));
  })
  .catch(error=>
    console.log(error));
   
  
    },[])
    console.log(user);
    console.log(userId.first_name)
  return (
  <div className=' m-40 '>
   <div>
   <h1 className="flex items-center text-5xl font-extrabold dark:text-white">Trainee - <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-800 dark:text-gray-500 ml-2">{userId.first_name}</span></h1>
   </div>
   <div className=' flex flex-col '>
   {
      user&&
      user.map(e=> <CardTraineePlans key={e.last_name} first_name={e.first_name} last_name={e.last_name} imgURL={e.imgURL}  />)
     }
   </div>
   
  </div>
  )
}
