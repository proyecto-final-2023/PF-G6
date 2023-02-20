// Libraries
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Image, { StaticImageData } from "next/image";
// Types
// Components/Assets
import { auth } from "../firebase";
import blankProfile from "../assets/img/blankProfile.png";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Login() {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      console.log("logge in Success :D");
    } catch (error) {
      console.log("USER CLOSED POP UP");
    }
  };

  const loginimg = (): string | StaticImageData => {
    if (user) return user.photoURL as string;
    else return blankProfile;
  };

  useEffect(() => {
    console.log(user?.email);
  }, [user]);
  return (
    <div className="">
      <button
        type="button"
        onClick={login}
        className="text-white m-2 bg-[#6f6f70] hover:bg-[#6f6f70]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
      {/* {user ? "Welcome, " + user.displayName + " e-mail : " + user.email : ""}
      <Image src={loginimg()} width={50} height={50} alt="a" />
      <br></br> */}
      {/* <button
        className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => auth.signOut()}
      >
        Log out
      </button> */}
    </div>
  );
}
