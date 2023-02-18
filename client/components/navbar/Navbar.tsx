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
    <nav className="w-full bg-red-900">
      <ul className="flex justify-around align-middle">
        <li>
          <Link replace href="/" scroll>
            <Image src={logoImg} alt={`link of the whole app`} width={34} />
          </Link>
        </li>

        {/* sorthand for hoverEventHandler = {hoverEventHandler}*/}
        <HoverLi
          href="trainee/tool/tools"
          text="tools"
          isHover={hovers.tools}
          optionsList={["Stop Watch", "Calories Calculator", "Fat Calculator"]}
          {...{ hoverEventHandler }}
        />

        <li>
          <Link replace href="/home">
            Home
          </Link>
        </li>

        <li>
          <Link replace href="/guest/trainning-list">
            Trainnings
          </Link>
        </li>

        <li>
          <input type="text" ref={searchRef} />
        </li>

        <HoverLi
          imgUrl={userImg}
          text="user"
          href="/"
          isHover={hovers.user}
          optionsList={
            isLoggedIn
              ? ["Diets", "Trainer Programs", "Log out"]
              : ["Register", "Log In"]
          }
          {...{ hoverEventHandler }}
        />
      </ul>
    </nav>
  );
}
