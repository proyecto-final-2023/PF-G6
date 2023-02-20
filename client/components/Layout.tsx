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
      <div className="main pt-14">{children}</div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
