import React, { useEffect } from "react";
import { Login } from "@/components/Login";
// import { Login2 } from "@/components/Login2";
import FormularioLogin from "@/components/LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export default function Index() {
  const [user, setUser] = useAuthState(auth);
  console.log(user);

  return (
    <div className="login">
      <FormularioLogin />
      <Login />
    </div>
  );
}
