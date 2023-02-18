import {
  ImWhatsapp,
  ImInstagram,
  ImFacebook2,
  ImTwitter,
} from "react-icons/im";
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" w-full p-2 text-amber-800 rounded-lg shadow md:flex md:items-center md:justify-between md:p-8 dark:bg-gray-800 position absolute bottom-0  border-4 border-gray-800  border-t-yellow-900">
      <h5 className=" text-sky-400/50 hover:text-amber-800  ">Contact</h5>
      <div className=" flex space-x-10  text-sky-400/100">
        <Link  href="https://www.instagram.com/">
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
        <Link href="/policies">
          <li className=" text-yellow-900  hover:text-amber-800 ">Terms & Conditions</li>
        </Link>
        <Link href="/about">
          <li className=" text-yellow-900  hover:text-amber-800 ">About Us</li>
        </Link>
        <Link href="/#">
          <li className="  text-yellow-900  hover:text-amber-800 ">Planes (todo)</li>
        </Link>
      </ul>
    </div>
  );
}
