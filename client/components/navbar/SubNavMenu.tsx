import {
  ReturnVoidOrJsx,
  SubNavMenuProps,
  UrlMapping,
} from "@/types/components";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebase";
import { setCookie,getCookie } from "@/utils/cookieHandler";
import axios from "axios";
import { useRouter } from "next/router";




// outside to avoid creating it on every re-render, since will never change


export default function SubNavMenu(props: SubNavMenuProps): ReturnVoidOrJsx {
  const { optionsList, singOutHandler, id } = props;
 
  const router=useRouter();
const key=getCookie('token')
console.log(key)
  const optionsUrlMapping: UrlMapping = {
    // Tools hover
    caloriescalculator: "/trainee/tools/calculator",
    fatcalculator: "/trainee/tools/fat-calculator",
    stopwatch: "/trainee/tools/stop-watch",
    // User guest hover
    register: "/login/register",
    login: "/login",
    // User logged in hover

    dashboard: async () => {
      await axios.post( `https://fp-server-cg2b.onrender.com/user/perfil`, "hola",{headers: {"x-access-token": key} })
      .then(res=>{
        console.log(res);
        const userRole=res?.data.role
        userRole==="trainer"&& router.push("/trainer");
        userRole==="trainee"&& router.push("/trainee");
        userRole==="user"&& alert("In order to enjoy this benefit, you must first acquire a membership.")

      }).catch(error=> console.log(error));
     
    },
    
    logout : () => {
      auth.signOut();
      setCookie("token", null);
      window.location.href = "/"
      
    }
  };



  // must return null to be a valid JSX child
  if (singOutHandler) {
    singOutHandler(id);
    return null;
  }

  // const handleLogout = () => {
  //   auth.signOut();
  //   setCookie("token", null);
  //   router.push("/"); // Redirige a la página de inicio
  // };

  return (
    <ul className="left-0 w-[115px] flex flex-col bg-gray-600 border-gray-200 rounded-lg shadow-lg ease-in-out duration-500">
      {optionsList.map((option) => {
        const urlKey = option.replace(" ", "").toLowerCase();
        // TS needed this to be happy, since I modifed the key before using it
        const urlOrFunc = optionsUrlMapping[urlKey as keyof UrlMapping];

        return (
          <li key={option.toString()}>
            {typeof urlOrFunc === "string" ? (
              <Link href={urlOrFunc}>
                <button
                  className="inline-block px-6 py-2.5 bg-transparent font-medium text-xs leading-tight uppercase hover:bg-gray-600 hover:text-orange-500 rounded w-[115px] transition duration-300 ease-in-out"
                  type="button"
                >
                  {option}
                </button>
              </Link>
            ) : (
              <button
                onClick={urlOrFunc}
                className="inline-block px-6 py-2.5 bg-transparent font-medium text-xs leading-tight uppercase hover:bg-gray-600 hover:text-orange-500 rounded w-[115px] transition duration-300 ease-in-out"
                type="button"
              >
                {option}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
