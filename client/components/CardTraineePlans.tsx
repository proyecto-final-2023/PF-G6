import React from 'react'

import logoImg from "@/assets/images/placeholder-logo.png";
import Link from "next/link";
import Image from "next/image";


export default function CardTraineePlans( {first_name,last_name,imgURL} ) {
 
  return (
    <div>
    <ul className="max-w-md rounded-md divide-y bg-[url('/tail-imgs/1zLe.gif')] bg-no-repeat bg-cover bg-bottom divide-gray-200 bg-gray-800 m-2 ">
     <li className="pb-3 sm:pb-4">
         <div className="flex items-center space-x-4">
           <div className="flex-shrink-0">
               <img className="w-10 h-10 rounded-full" src={imgURL} alt="Neil image"/>
           </div>
           <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white  truncate ">
               {first_name}
               </p>
               <p className="text-sm text-white truncate ">
                 {last_name}
               </p>
           </div>
           <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
             <Image src={logoImg} alt={`link of the whole app`} className="inline-block mt-2  align-bottom sm:w-[100px] sm:h-[40px]"/> 
           </div>
           <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
               
           </div>
         </div>
     </li>
</ul>
</div>
  )
}
