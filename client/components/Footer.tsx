import React from 'react'
import Link from 'next/link'
import { ImInstagram } from "react-icons/im";
import { ImWhatsapp } from "react-icons/im";
import { ImFacebook2} from "react-icons/im";
import { ImTwitter} from "react-icons/im";
//instalar npm install react-icons --save
export default function Footer() {
  return(
  <div className="mt-20 flex items-center text-sm text-black-400 bg-red-900">
  <h5>Contactos</h5>
  <div className="min-w-0 flex-1">
  <Link href="https://www.instagram.com/">
  <ImInstagram className='flex-auto w-7 ...' />
  </Link>
  <Link href="https://twitter.com/">
  <ImTwitter className='flex-auto w-7 ...'   />
  </Link>
  <Link href="https://es-la.facebook.com/">
  <ImFacebook2 className='flex-auto w-7 ...'  />
  </Link>
  <Link href="/?????">
  <ImWhatsapp className='flex-auto w-7 ...'  />
  </Link>
  </div >

 <ul className="flex ...">
 <Link  href="/politicas">
 <li className='flex-auto w-60 ...'>Termino y condiciones</li>
 </Link>
 <Link  href="/nosotros">
 <li className='flex-auto w-40 ...' >Sobre nosotros</li>
 </Link>
 <Link  href="/planesPrecios">
 <li className='flex-auto w-30 ...'>Planes</li>
 </Link>
 </ul>
 </div>
) 
}
