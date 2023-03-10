import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-max">
      <Navbar />
      {children}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
