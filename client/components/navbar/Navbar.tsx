import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

import HoverLi from "./HoverLi";
import { NavbarStates } from "@/types/components";

import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/placeholder-logo.png";

// * uwu *//
export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hovers, setHovers] = useState({ tools: false, user: false });

  const hoverEventHandler = ({ type, key }: NavbarStates["hovers"]) => {
    // if mouse enter then hover state of key => true
    if (type === "enter") setHovers((prev) => ({ ...prev, [key]: true }));
    // else => hover state of key => false
    else setHovers((prev) => ({ ...prev, [key]: false }));
  };

  // TODO: change it to the real value
  const isLoggedIn = false;

  return (
    <nav className="w-full bg-gray-600 p-0 h-[72px] border-x-none border-b-[2px] border-orange-500" >
      <ul className="flex justify-around align-middle">
        <li className="inline-block align-bottom text-center w-[100px] h-[65px]">
        <Link replace href="/" scroll>
        <Image src={logoImg} alt={`link of the whole app`} className="inline-block align-bottom mt-[3px] w-[75px] h-[65px]" />
        </Link>
        </li>
        <li  className="inline-block align-bottom text-center pt-5">
          <input type="text" ref={searchRef} />
        </li>

        {/* sorthand for hoverEventHandler = {hoverEventHandler}*/}
        

        <li className="inline-block align-bottom h-[70px] w-[115px] text-center">
          <Link replace href="/home">
          <button type="button" className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded  hover:text-orange-500 transition duration-300 ease-in-out">Home</button>
          </Link>
        </li>

        <li className="inline-block align-bottom text-center w-[115px] h-full">      
          <Link replace href="/guest/trainning-list">
          <button type="button" className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">Trainings</button>
          </Link>
        </li>

        <HoverLi
          href="trainee/tool/tools"
          text="tools"
          isHover={hovers.tools}
          optionsList={["IMC", "Diet Planning"]}
          {...{ hoverEventHandler }}
        />

        <HoverLi
          imgUrl={userImg}
          text="user"
          href="/"
          isHover={hovers.user}
          optionsList={
            isLoggedIn
              ? ["Diets", "Trainer", "Programs", "Log out"]
              : ["Register", "Log In"]
          }
          {...{ hoverEventHandler }}
        />
      </ul>
    </nav>
  );
}
