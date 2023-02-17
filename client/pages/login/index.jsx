import React from "react";
import { Login } from "@/components/Login";
import { Login2 } from "@/components/Login2";
import FormularioLogin from "@/components/LoginForm"

export default function Index() {
  return (
    <>
      <FormularioLogin />
      <Login />
      <Login2 />
    </>
  );
}
