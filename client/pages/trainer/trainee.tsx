import axios from "axios";
import { useEffect } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";

export default function trainee() {
  const key = getCookie("token");
  useEffect(() => {
    axios
      .get("https://fp-server-cg2b.onrender.com/trainees/byplan?page=1", {
        headers: { "x-access-token": key }
      })
      .then((data) => {})
      .catch((error) => console.error(error));
  }, []);
  return <div>trainees</div>;
}
