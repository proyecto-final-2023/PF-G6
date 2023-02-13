import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// const Navbar = () => {
//   return <h3>This is Header</h3>;
// };

// const Footer = () => {
//   return <h3>This is Footer</h3>;
// };

const Layout = ({ children }: typeof React.Children) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
