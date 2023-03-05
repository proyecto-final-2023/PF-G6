import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HoverLi from "./HoverLi";
import { NavbarStates } from "@/types/components";
import CustomHoverLi from "./CustomHoverLi";
import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/placeholder-logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Burger from "./Burger";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookieHandler";
export const linkStyles =
  "inline-block font-medium text-xs leading-tight uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out inline-block p-1 ";
// * uwu *//
export default function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [hovers, setHovers] = useState({ tools: false, user: false });
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const [user1, setUser1] = useState<{display_name:string}>();
  const key =getCookie('token')
  const photo=user?.photoURL
  const name = user?.displayName;
  

  console.log(user);
  const hoverEventHandler = ({ type, key }: NavbarStates["hovers"]) => {
    // if mouse enter then hover state of key => truepages-tools
    if (type === "enter") setHovers((prev) => ({ ...prev, [key]: true }));
    // else => hover state of key => false
    else setHovers((prev) => ({ ...prev, [key]: false }));
  };

  const burgerHandler = () => {
    setIsBurgerActive((prev) => !prev);
  };

  // aqui te manda
  // useEffect(() => {
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
  //       headers: { "x-access-token": key },
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       setUser1({
  //         display_name: ` ${data.data.first_name}  ${data.data.last_name}`,
  //       });
  //     });
  // }, []);
  console.log("@navbar/Navbar", user1);
  const [viewportWidth, setViewportWidth] = useState(0);
    // aqui te manda 
 useEffect(()=>{
  axios.post("http://localhost:3001/user/perfil",null,{headers:{'x-access-token': key}})
  .then((data) => {
   console.log(data.data)
   setUser1({
     display_name:` ${data.data.first_name}  ${data.data.last_name}`
   })
  })
 },[])
 console.log(user1)
  useEffect(() => {
    function updateViewportWidth() {
      setViewportWidth(window.innerWidth);
    }

    // Add event listener to update viewport width on resize
    window.addEventListener("resize", updateViewportWidth);

    // Set initial viewport width
    updateViewportWidth();

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  return (
    
    <div>
      <Burger isBurgerActive={isBurgerActive} burgerHandler={burgerHandler} />
      <nav
        className={`sm:h-[72px] sm:p-0 sm:top-0 py-12 px-6 h-[100vh] w-full bg-gray-800 border-x-none border-b-[2px] border-yellow-900 bottom-0 z-20 transition-all ease duration-300 fixed ${
          isBurgerActive || viewportWidth > 800
            ? "-translate-x-0"
            : "translate-x-[100vw]"
        }`}
      >
        <ul className="flex justify-evenly items-center flex-col h-[85vh] sm:h-[72px] sm:flex-row">
          <li className="inline-block align-bottom text-center w-[100px] h-[65px] p-1">
            <Link replace href="/" scroll>
              <Image
                src={logoImg}
                alt={`link of the whole app`}
                className="inline-block  align-bottom sm:w-[100px] sm:h-[65px]"
              />
            </Link>
          </li>

          <li className="flex justify-center items-center">
            <Link replace href="/home" className={linkStyles}>
              Home
            </Link>
          </li>

          <li className="justify-center flex items-center">
            <Link replace href="/guest/trainning-list" className={linkStyles}>
              Trainers
            </Link>
          </li>

          <CustomHoverLi
            href="trainee/tools"
            text="tools"
            isHover={hovers.tools}
            vw={viewportWidth}
            optionsList={[
              "Stop Watch",
              "Calories Calculator",
              "Fat Calculator",
            ]}
            {...{ hoverEventHandler }}
          />

          {/* {user && <li className="m-5">Hello {user?.display_name}</li>} */}
          {user1 && <li className="m-5">Hello {user1?.display_name}</li>}
          <HoverLi
            imgUrl={photo ? photo : userImg}
            text="user"
            href="/"
            isHover={hovers.user}
            vw={viewportWidth}
            optionsList={
              user || user1 
                ? ["Dashboard", "Log out"]
                : ["Register", "Log In"]
            }
            {...{ hoverEventHandler }}
          />
        </ul>
      </nav>
    </div>
  );
}