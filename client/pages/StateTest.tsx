import axios from "axios";
import { useEffect } from "react";

export default function App(props: { res: string }) {
  console.log(props.res);

  useEffect(() => {
    const url = "http://localhost:3001/base";
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhZTM0NzBmLTViZjAtNDI0My04ZTYzLTNjMWE5MWI0OWRiYSIsImlhdCI6MTY3NzI4MjkwOCwiZXhwIjoxNjc3ODg3NzA4fQ.FYdSGY48y6OvWmUtVWVO25E3Ke9AKav6OvxLkxkiJwI`;

    (async () => {
      const { data: res } = (await axios(url, {
        headers: {
          "x-access-token": token,
        },
      })) || { data: "testing" };

      console.log(res);
    })();
  }, []);

  return (
    <main>
      <h1>HOLY SHIT</h1>
    </main>
  );
}
