import React from "react";
import Formulario from "@/components/Register";
import { getCookie, setCookie } from "@/utils/cookieHandler";

export default function Register() {
  setCookie("birb", [123, 44]);

  console.log(getCookie("birb"));

  return (
    <>
      <Formulario></Formulario>
    </>
  );
}
