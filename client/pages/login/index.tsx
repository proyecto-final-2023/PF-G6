// Libraries
import React from "react";
// Types
// Components/Assets
import FormularioLogin from "@/components/LoginForm";
import Login from "@/components/Login";
import Login2 from "@/components/Login2";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Index() {
  return (
    <div className="login">
    <FormularioLogin />
    <Login />
    <Login2 />
    
  </div>
  );
}
