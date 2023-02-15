import {
  ImWhatsapp,
  ImInstagram,
  ImFacebook2,
  ImTwitter,
} from "react-icons/im";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-20 flex items-center text-sm text-black-400 bg-red-900">
      <h5>Contactos</h5>
      <div className="min-w-0 flex-1">
        <Link href="https://www.instagram.com/">
          <ImInstagram className="flex-auto w-7" />
        </Link>
        <Link href="https://twitter.com/">
          <ImTwitter className="flex-auto w-7" />
        </Link>
        <Link href="https://es-la.facebook.com/">
          <ImFacebook2 className="flex-auto w-7" />
        </Link>
        <Link href="#">
          <ImWhatsapp className="flex-auto w-7" />
        </Link>
      </div>

      <ul className="flex">
        <Link href="/politicas">
          <li className="flex-auto w-60">Terms & Conditions</li>
        </Link>
        <Link href="/about">
          <li className="flex-auto w-40">About Us</li>
        </Link>
        <Link href="/#">
          <li className="flex-auto w-30">Planes (todo)</li>
        </Link>
      </ul>
    </div>
  );
}
