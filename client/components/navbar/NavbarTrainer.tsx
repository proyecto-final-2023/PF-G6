import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import { AxiosResponse } from "axios";


interface User {
  display_name: string;
}

export default function Trainer() {
  const [user, setUser] = useAuthState(auth);
  const [user1, setUser1] = useState();
  const key = getCookie("token");


  useEffect(() => {
    axios
      .post(`http://localhost:3001/user/perfil`, null, {
        headers: {
          "x-access-token": key,
        },
      })
      .then((data: AxiosResponse<any, any>) => {
        setUser1({
          display_name: ` ${data.data.first_name}  ${data.data.last_name}`,
        });
        if(data.data.imgURL===null){
          setLogo((data.data.membership.trainer.logo))
        }else{
          setLogo(data.data.imgURL)
        }
        
      });
  }, []);
  console.log(user1);
  console.log(user);
  return (
    <div className="  flex  flex-col z-40 w-60   ">
      <nav className="  bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center text-white font-bold m-20">
          Trainer
        </div>
        <div></div>
        <div className="items-center justify-center text-white font-bold m-10">
          <img
            className="rounded-lg justify-items-center"
            src={logo}
            alt="data"
          />
        <div className="w-50">
        <Link href="/trainer/logo" className="inline-block w-full p-4 items-center bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">ADD</Link>
         </div>
          <p>{user1?.display_name}</p>
        </div>
        <div className="flex flex-col ">
          <ul className="space-y-1 m-auto">
            <li>
       
            </li>
            <li>
              <Link
                href="/trainer/exercises-library"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Rotines</span>
              </Link>
            </li>
            <li>
              <Link
                href="/trainer/blog"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg 
                  aria-className="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Blog</span>
              </Link>
            </li>
            <li>
              <Link
                href="trainer/trainee"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Certification</span>
              </Link>
            </li>

            <li>
              <Link
                href=""
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Add Logo </span>
              </Link>
            </li>
    
          </ul>
        </div>
      </nav>
    </div>
  );
}
