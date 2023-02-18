import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function EmailConfirmed() {
  const { post, fetchPost } = useStore((state) => ({
    post: state.post,
    fetchPost: state.fetchPost,
  }));

  const router = useRouter();
  const [confirmation, setConfirmation] =
    (useState < "ok") | "error" | ("loading" > "loading");

  // localhost:3000/email-confirmed?hash=YOUR_HASH
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios(
          `https//:localhost:3001/confirm${router.query.token}`
        );
        setConfirmation("ok");
      })();
    } catch (error) {
      setConfirmation("error");
      console.log(error);
    }
  }, []);

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
      </div>
    </div>
  );
}
