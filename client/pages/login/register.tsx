// Libraries
import React from "react";
// Types
// Components/Assets
import RegisterForm from "@/components/RegisterForm";
import { getCookie, setCookie } from "@/utils/cookieHandler";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Register() {
  setCookie("birb", [123, 44]);

  // console.log(getCookie("birb"));

  return (
    <>
      <RegisterForm />
    </>
  );
}
