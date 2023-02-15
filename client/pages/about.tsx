import { getCookie } from "@/utils/cookieHandler";

export default function About() {
  console.log(getCookie("birb"));

  return <div>Nosotros...</div>;
}
