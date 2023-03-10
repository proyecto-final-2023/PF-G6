import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ConfirmationState = "ok" | "error" | "loading";

export default function EmailConfirmed() {
  const router = useRouter();

  const [confirmation, setConfirmation] = useState<ConfirmationState>();

  // ${process.env.NEXT_PUBLIC_API_URL}/email-confirmed?hash=YOUR_HASH
  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const { data } = await axios(
  //         `${process.env.NEXT_PUBLIC_API_URL}/confirm${router.query.token}`
  //       );
  //       setConfirmation("ok");
  //     })();
  //   } catch (error) {
  //     setConfirmation("error");
  //   }
  // }, []);

  confirmation === "ok" && router.replace("/home");

  return (
    <div className="grid items-center">
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
        <button onClick={() => router.replace("/home")}>Go Home</button>
      </div>
    </div>
  );
}
