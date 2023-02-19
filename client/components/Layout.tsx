// Libraries
import { ReactNode } from "react";
// Types
// Components/Assets
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
