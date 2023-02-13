import { useRef, useState } from "react";

import userImg from "../images/user.png";
import logoImg from "../images/placeholder-logo.png";
import HoverLi from "./HoverLi";
import { NavbarStates } from "@/types/components";

export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hovers, setHovers] = useState({ tools: false, user: false });

  const hoverEventHandler = ({ type, key }: NavbarStates["hovers"]) => {
    // if mouse enter then hover state of key => true
    if (type === "enter") setHovers((prev) => ({ ...prev, [key]: true }));
    // else => hover state of key => false
    else setHovers((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <nav className="w-full bg-red-900">
      <ul className="flex">
        {/* sorthand for hoverEventHandler = {hoverEventHandler}*/}
        <HoverLi
          text="tools"
          imgUrl={logoImg}
          isHover={hovers.tools}
          {...{ hoverEventHandler }}
        />

        <li>
          <a href="#">Home</a>
        </li>

        <li>
          <a href="#">Tools</a>
        </li>

        <li>
          <a href="#">Trainnings</a>
        </li>

        <li>
          <input type="text" ref={searchRef} />
        </li>

        <HoverLi
          text="user"
          imgUrl={userImg}
          isHover={hovers.user}
          {...{ hoverEventHandler }}
        />
      </ul>
    </nav>
  );
}
