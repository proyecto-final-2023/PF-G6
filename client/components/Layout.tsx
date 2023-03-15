import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="min-h-[calc(100% - 20rem)] pt-20">{children}</div>
      <div className="footer fixed bottom-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
}
