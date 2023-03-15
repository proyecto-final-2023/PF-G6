import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="min-h-full flex flex-col flex-1">{children}</div>
      <div className="footer flex-shrink">
        <Footer />
      </div>
    </div>
  );
}
