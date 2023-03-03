import PaypalButton from "@/components/PaypalButton";
import axios from "axios";

const url = "http://localhost:3001/base";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhZTM0NzBmLTViZjAtNDI0My04ZTYzLTNjMWE5MWI0OWRiYSIsImlhdCI6MTY3NzI4MjkwOCwiZXhwIjoxNjc3ODg3NzA4fQ.FYdSGY48y6OvWmUtVWVO25E3Ke9AKav6OvxLkxkiJwI`;

export default function App(props: { res: string }) {
  console.log(props.res);

  const testGet = async () => {
    const { data: res } = (await axios(url, {
      headers: {
        "x-access-token": token,
      },
    })) || { data: "testing" };

    console.log(res);
  };

  const testPost = async () => {
    const { data: res } = (await axios.post( url,{ name: "joe" },{headers: {"x-access-token": token,},
      }
    )) || { data: "POSTING" };

    console.log(res);
  };

  return (
    <main className="mt-10">
      <h1>HOLY SHIT</h1>
      <button className="m-4 p-4 border-red-200 bg-black" onClick={testGet}>
        GET
      </button>
      <button className="m-4 p-4 border-red-200 bg-black" onClick={testPost}>
        POST
      </button>
      <PaypalButton amountToPay={1.1} serviceName="pog" />
    </main>
  );
}
