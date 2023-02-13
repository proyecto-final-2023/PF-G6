import Image from "next/image";
import { useRef, useState } from "react";
import userImg from "../images/user.png";
import logoImg from "../images/placeholder-logo.png";

export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hovers, setHovers] = useState({ tools: false, user: false });

  const userEnterHandler = (key: "tools" | "user") => {
    setHovers((prev) => {
      const copy = { ...prev };
      copy[key] = true;
      return copy;
    });
  };

  const userLeaveHandler = (key: "tools" | "user") => {
    setHovers((prev) => {
      const copy = { ...prev };
      copy[key] = false;
      return copy;
    });
  };

  return (
    <nav className="w-full bg-red-900">
      <ul className="flex">
        <li
          onMouseEnter={() => userEnterHandler("tools")}
          onMouseLeave={() => userLeaveHandler("tools")}
        >
          <a href="#">
            <Image src={logoImg} width={45} alt="logo img" />
          </a>
        </li>

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

        <li
          onMouseEnter={() => userEnterHandler("user")}
          onMouseLeave={() => userLeaveHandler("user")}
        >
          <Image src={userImg} width={45} alt="logo img" />
        </li>
      </ul>
    </nav>
  );
}
