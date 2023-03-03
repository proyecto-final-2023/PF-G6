import React from 'react'
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";


export default function () {
  const [user, setUser] = useAuthState(auth);
  console.log(user?.displayName)
  return (
    <div className='flex'>
      <nav className="flex flex-col w-64 h-screen py-4 bg-gray-900">
      <div className="flex items-center justify-center text-white font-bold m-20">
        trainer
        
      </div>
       <div className="items-center justify-center text-white font-bold m-10">
         <p>{user?.displayName}</p>
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