import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logoImg from "@/assets/images/placeholder-logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "@/utils/cookieHandler";

export default function FormularioLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    authExtern: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/auth`, formData)
      .then((data) => {
        setCookie("token", data.data.token);
        router.push("/home");
      })
      .catch((error) => {
        window.alert("Error Loggin in" + error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form className="caja-login" onSubmit={handleSubmit}>
      <Image
        src={logoImg}
        width={80}
        alt={`link of the whole app`}
        className=" pt-8  "
      />
      <h2 className="text-gray-300 text-xl  ">Iniciar Sesión</h2>
      <label>
        <input
          className="m-4  bg-gray-200 shadow-2xl rounded-md"
          type="email"
          name="email"
          placeholder="E-mail..."
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        <input
          className=" bg-gray-200 rounded-md "
          type="password"
          name="password"
          placeholder="Password..."
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="button " type="submit">
        Login
      </button>
      <p className="m-4 font-mono text-xs ">
        You do not have an account?{" "}
        {
          <Link
            className="text-yellow-800 hover:text-yellow-400 font-mono text-xs  "
            href="/login/register"
          >
            Sign up here
          </Link>
        }
      </p>
    </form>
  );
}
