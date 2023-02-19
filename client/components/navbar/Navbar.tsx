// Libraries
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
// Types
import { OptionsUrlMapping } from "@/types/components";
// Components/Assets
import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/placeholder-logo.png";
import HoverTextLi from "./ClickTextLi";
import ClickImageLi from "./ClickImageLi";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
    <nav className="bg-[rgba(23,23,23,0.4)] fixed w-full border-b-[2px] border-b-yellow-900 drop-shadow px-4 z-10">
      <ul className="flex justify-between items-center">
        <li>
          <Link replace href="/">
            <Image
              src={logoImg}
              alt={`link of the whole app`}
              className="inline-block mt-[3px] w-[75px] h-[65px]"
            />
          </Link>
        </li>

        <li>
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

        <li className="font-medium text-xs uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">
          <Link replace href="/home">
            Home
          </Link>
        </li>

        <HoverTextLi
          text="Tools"
          optionsList={optionsUrlMapping.tools}
          isClicked={tools}
          clickEventHandler={toolsClickHandler}
        />

        <ClickImageLi
          imgUrl={userImg}
          optionsList={
            isLoggedIn
              ? optionsUrlMapping.loggedInUser
              : optionsUrlMapping.loggedOutUser
          }
          isClicked={user}
          clickEventHandler={userPicClickHandler}
        />

        <li className="font-medium text-xs uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">
          <Link replace href="/guest/trainning-list">
            Trainings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
