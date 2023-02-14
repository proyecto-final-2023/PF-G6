import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

import HoverLi from "./HoverLi";
import { NavbarStates } from "@/types/components";

import userImg from "../images/user.png";
import logoImg from "../images/placeholder-logo.png";

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
    <nav className="w-full bg-red-900 h-7 ">
      <ul className="flex justify-around align-middle">
        <li>
          <Link href={"#"}>
            <Image src={logoImg} alt={`link of the whole app`} width={34} />
          </Link>
        </li>

        {/* sorthand for hoverEventHandler = {hoverEventHandler}*/}
        <HoverLi
          text="tools"
          isHover={hovers.tools}
          optionsList={["IMC", "Diets Planning"]}
          {...{ hoverEventHandler }}
        />

        <li>
          <a href="#">Home</a>
        </li>

        <li>
          <a href="#">Trainnings</a>
        </li>

        <li>
          <input type="text" ref={searchRef} />
        </li>

        {isLoggedIn ? (
          <HoverLi
            imgUrl={userImg}
            text="user"
            isHover={hovers.user}
            optionsList={["Diets", "Trainer", "Programs", "Log out"]}
            {...{ hoverEventHandler }}
          />
        ) : (
          <HoverLi
            imgUrl={userImg}
            text="user"
            isHover={hovers.user}
            optionsList={["Sign in", "Login"]}
            {...{ hoverEventHandler }}
          />
        )}
      </ul>
    </nav>
  );
}
