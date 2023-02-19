// Libraries
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
// Types
import {
  NavbarStates,
  OptionsUrlMapping,
  UrlMapping,
} from "@/types/components";
// Components/Assets
import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/placeholder-logo.png";
import HoverImageLi from "./ClickImageLi";
import HoverTextLi from "./ClickTextLi";

const optionsUrlMapping: OptionsUrlMapping = {
  loggedInUser: [
    { title: "Diets", url: "/trainee/eating-plans" },
    { title: "Trainer Programs", url: "/trainee/training-plans" },
    {
      title: "Log out",
      handler: () => {
        console.log("Discord kitte FTW");
      },
    },
  ],
  loggedOutUser: [
    { title: "Register", url: "/login/register" },
    { title: "Log In", url: "/login" },
  ],
  tools: [
    { title: "Stop Watch", url: "/trainee/tools/stop-watch" },
    { title: "Calories Calculator", url: "/trainee/tools/calculator" },
    { title: "Fat Calculator", url: "/trainee/tools/fat-calculator" },
  ],
};

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(false);
  const [tools, setTools] = useState(false);

  const toolsClickHandler = () => {
    setTools((prev) => !prev);
  };

  const userPicClickHandler = () => {
    setUser((prev) => !prev);
  };

  // TODO: change it to the real value
  const isLoggedIn = false;

  return (
    <nav className="w-full bg-gray-800  p-0 h-[72px] border-x-none border-b-[2px]  border-yellow-900">
      <ul className="flex justify-around align-middle">
        <li className="inline-block align-bottom text-center w-[100px] h-[65px]">
          <Link replace href="/" scroll>
            <Image
              src={logoImg}
              alt={`link of the whole app`}
              className="inline-block align-bottom mt-[3px] w-[75px] h-[65px]"
            />
          </Link>
        </li>
        <li className="inline-block align-bottom text-center pt-5">
          {/* <input type="text" ref={searchRef} /> */}
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

        {/* sorthand for clickEventHandler = {clickEventHandler}*/}

        <li className="inline-block align-bottom h-[70px] w-[115px] text-center">
          <Link
            replace
            href="/home"
            className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded  hover:text-orange-500 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>

        <li className="inline-block align-bottom text-center w-[115px] h-full">
          <Link
            replace
            href="/guest/trainning-list"
            className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out"
          >
            Trainings
          </Link>
        </li>

        <HoverImageLi
          imgUrl={userImg}
          optionsList={
            isLoggedIn
              ? optionsUrlMapping.loggedInUser
              : optionsUrlMapping.loggedOutUser
          }
          isClicked={user}
          clickEventHandler={userPicClickHandler}
        />

        <HoverTextLi
          text="Tools"
          optionsList={optionsUrlMapping.tools}
          isClicked={tools}
          clickEventHandler={toolsClickHandler}
        />
      </ul>
    </nav>
  );
}
