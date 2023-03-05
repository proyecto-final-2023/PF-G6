import React from "react";
import FormularioLogin from "@/components/LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Login } from "@/components/Login";

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
