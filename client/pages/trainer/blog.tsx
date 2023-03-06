import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookieHandler";

export default function blog() {
  const key = getCookie("token");
  useEffect(() => {
    axios
      .get("https://fp-server-cg2b.onrender.com/trainers/comment", {
        headers: { "x-access-token": key }
      })
      .then((data) => {})
      .catch((error) => console.error(error));
  }, []);
  return <div>blog</div>;
}
