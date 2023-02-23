import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

import HoverLi from "./HoverLi";
import { NavbarStates } from "@/types/components";

import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/placeholder-logo.png";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export const linkStyles =
  "inline-block font-medium text-xs leading-tight uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out";
// * uwu *//
export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hovers, setHovers] = useState({ tools: false, user: false });
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [user, setUser] = useAuthState(auth);
  // const photo=user?.photoURL
  const name = user?.displayName;

  // console.log(user);
  const hoverEventHandler = ({ type, key }: NavbarStates["hovers"]) => {
    // if mouse enter then hover state of key => truepages-tools
    if (type === "enter") setHovers((prev) => ({ ...prev, [key]: true }));
    // else => hover state of key => false
    else setHovers((prev) => ({ ...prev, [key]: false }));
  };

  const burgerHandler = () => {
    console.log("burger clicked", isBurgerActive);
    setIsBurgerActive((prev) => !prev);
  };

  return (
    <div>
      {/* TESTIN BTN REMOVE TODO: LATER */}
      <button
        onClick={burgerHandler}
        className="absolute top-20 bg-red-600 z-50"
      >
        TOGGLE BURGER
      </button>
      {/* this burger is */}
      <div
        className={`fixed bg-red-500 w-7 h-7 z-30 pointer ${
          !isBurgerActive && "hidden"
        }`}
        onClick={burgerHandler}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className="w-full bg-gray-800 h-[72px] border-x-none border-b-[2px] border-yellow-900 sm:w-3/4 sm:top-0 sm:fixed sm:bottom-0 sm:z-20">
        <ul className="flex justify-around align-middle">
          <li className="inline-block align-bottom text-center w-[100px] h-[65px]">
            <Link replace href="/" scroll>
              <Image
                src={logoImg}
                alt={`link of the whole app`}
                className="inline-block align-bottom mt-[3px] w-[100px] h-[65px]"
              />
            </Link>
          </li>

          <li className="inline-block align-bottom text-center pt-5">
            <input
              type="search"
              ref={searchRef}
              id="default-search"
              className="inline-block w-[150px] p-1 bg-gray-600 focus:bg-gray-500 focus:outline-none focus:w-[300px] duration-300 border-[2px] border-gray-400 rounded-l-lg  placeholder-white text-white"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="absolute p-2 inline-block bg-gray-600 border-[2px] border-gray-400 rounded-r-lg uppercase text-xs font-medium"
            >
              Search
            </button>
          </li>

          <li className="flex justify-center items-center">
            <Link replace href="/home" className={linkStyles}>
              Home
            </Link>
          </li>

          <li className="justify-center flex items-center">
            <Link replace href="/guest/trainning-list" className={linkStyles}>
              Trainings
            </Link>
          </li>

          <HoverLi
            href="trainee/tool/tools"
            text="tools"
            isHover={hovers.tools}
            optionsList={[
              "Stop Watch",
              "Calories Calculator",
              "Fat Calculator",
            ]}
            {...{ hoverEventHandler }}
          />

          {user && <li className="m-5">Hello {name}</li>}
          <HoverLi
            imgUrl={userImg}
            text="user"
            href="/"
            isHover={hovers.user}
            optionsList={
              user
                ? ["Diets", "Trainer Programs", "Log out"]
                : ["Register", "Log In"]
            }
            {...{ hoverEventHandler }}
          />
        </ul>
      </nav>
    </div>
  );
}
