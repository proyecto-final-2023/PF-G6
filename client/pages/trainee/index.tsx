import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import myImage from '../../public/tail-imgs/gym-bg.jpg'
import Link from "next/link";

export default function Index() {
  const [progress, setProgress] = useState("0");




  return (
    <>
      <ul className="flex justify-around align-middle h-[30vh]">
        <li className="my-auto">
          <h1>Progress:{progress}%</h1>
        </li>
        <li className="my-auto">
          <Link href=''>
            <p>My profile</p>
          </Link> 
        </li>
        <li>
          <Image src={myImage} alt="" className="h-[30vh] w-full"/>
        </li>
      </ul>
      <div>
        
      </div>
      <div>
        <div  className="flex items-center justify-center h-[10vh]">
          <h2>
           My events
          </h2>
        </div> 
        
      </div>   
    </>
  )
}




