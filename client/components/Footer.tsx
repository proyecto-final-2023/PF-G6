// Libraries
import {
  ImWhatsapp,
  ImInstagram,
  ImFacebook2,
  ImTwitter,
  ImMail2,
} from "react-icons/im";
import Link from "next/link";
import Image from "next/image";
// Types
// Components/Assets
import logoImg from "@/assets/images/placeholder-logo.png";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Footer() {
  return (
    <div className=" w-full  text-amber-800 rounded-lg shadow md:flex md:items-center md:justify-between md:p-8 bg-gray-800 position relative bottom-0 min-h-max  border-4 border-gray-800  border-t-yellow-900">
      <div className="flex flex-row  space-x-4   text-sky-400/100">
        <Link href="/contact">
          <ImMail2 className=" text-sky-400/20 hover:text-yellow-900 " />
        </Link>
        <Link href="https://www.instagram.com/">
          <ImInstagram className=" text-sky-400/20 hover:text-yellow-900 " />
        </Link>
        <Link href="https://twitter.com/">
          <ImTwitter className="  text-sky-400/20 hover:text-yellow-900 " />
        </Link>
        <Link href="https://es-la.facebook.com/">
          <ImFacebook2 className="  text-sky-400/20 hover:text-yellow-900  " />
        </Link>
        <Link href="#">
          <ImWhatsapp className=" w-30 text-sky-400/20 hover:text-yellow-900   " />
        </Link>
      </div>

      <ul className="flex space-x-6">
        <p>© 2023 FIT-UP & GROUP 6</p>
        <Image
          src={logoImg}
          width={40}
          alt={`link of the whole app`}
          className=" "
        />
        <Link href="/policies">
          <li className=" text-yellow-900  hover:text-amber-800 ">
            Terms & Conditions
          </li>
        </Link>
        <Link href="/about">
          <li className=" text-yellow-900  hover:text-amber-800 ">About Us</li>
        </Link>
        <Link href="/#">
          <li className="  text-yellow-900  hover:text-amber-800 ">
            Planes (todo)
          </li>
        </Link>
      </ul>
    </div>
  );
}
