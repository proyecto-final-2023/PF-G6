import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";
import Image from "next/dist/client/image";
import imagen from "../assets/images/img_landing1.png"
import TripleImagesCarrousel from "./Carousel/TripleImagesCarrousel";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {/* <Image  alt="imagen1"src={imagen}/> */}
      {children}
      <div className="footer">
      <Footer />
      </div>
    </div>
  );
}
