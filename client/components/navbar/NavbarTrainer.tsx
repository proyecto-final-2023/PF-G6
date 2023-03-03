import React from 'react'
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, setCookie } from "@/utils/cookieHandler";


export default function () {
  const [user, setUser] = useAuthState(auth);
  const [user1, setUser1] = useState();
  const key =getCookie('token')
  console.log(user?.displayName)
  useEffect(()=>{
    axios.post("http://localhost:3001/user/perfil",null,{headers:{'x-access-token': key}})
    .then((data) => {
     console.log(data.data)
     setUser1({
       display_name:` ${data.data.first_name}  ${data.data.last_name}`
     })
    })
   },[])
   console.log(user1)
   console.log(user)
  return (
    <div className='flex'>
      <nav className="flex flex-col w-64 h-screen py-4 bg-gray-900">
      <div className="flex items-center justify-center text-white font-bold m-20">
        trainer 
      </div>
      <div>

      </div>
       <div className="items-center justify-center text-white font-bold m-10">
         <p>{user?.displayName}</p>
         <p>{user1?.display_name}</p>
       </div>
      <div className="flex flex-col mt-8">
        <Link href="#" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700">
          Blog
        </Link>
        <Link href="#" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700">
          trainee
        </Link>
        <Link href="#" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700">
          planes
        </Link>
        <Link href="/trainer/plansTrainee" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700">
          Crear plan
        </Link>
      </div>
    </nav>
    
     
    </div>
  )
}