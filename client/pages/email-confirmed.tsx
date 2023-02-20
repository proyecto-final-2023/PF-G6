// Libraries
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
import { ConfirmationState } from "@/types/components";
// Components/Assets
import useStore from "@/store";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function EmailConfirmed() {
  const { updateCock, userData } = useStore((state) => ({
    userData: state.userData,
    updateCock: state.updateConfirmed,
  }));

  console.log(userData);

  const router = useRouter();

  const [confirmation, setConfirmation] = useState<ConfirmationState>();

  // localhost:3000/email-confirmed?hash=YOUR_HASH
  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const { data } = await axios(
  //         `https//:localhost:3001/confirm${router.query.token}`
  //       );
  //       setConfirmation("ok");
  //     })();
  //   } catch (error) {
  //     setConfirmation("error");
  //     console.log(error);
  //   }
  // }, []);

  confirmation === "ok" && router.replace("/home");

  return (
    <div className="grid items-center">
      <button onClick={() => updateCock(true)}>FETCH</button>
      <h1>title {userData.confirmed}</h1>

      <div className="bg-slate-500 w-2/3 min-h-full">
        {confirmation === "ok" && (
          <div>
            <h1>Your email has been confirmed, feel free to roam around :D</h1>
          </div>
        )}
        {confirmation === "error" && (
          <div>
            <h1>There has been an error please contact us</h1>
            <a href="#" target="_blank">
              Here
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
