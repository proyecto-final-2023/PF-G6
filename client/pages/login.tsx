import React, { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import blankProfile from "../assets/img/blankProfile.png";
import Image from "next/dist/client/image";

export default function login() {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <p className="text-sm">LOGIN WITH GOOGLE</p>
      <button className="text-green-400 rounded-md bg-white" onClick={login}>
        LOGIN
      </button>
      {user ? "Welcome, " + user.displayName + " e-mail : " + user.email : ""}
      <Image
        src={user?.photoURL || blankProfile}
        width={50}
        height={50}
        alt="a"
      />
      <br></br>
      <button
        className="text-green-400 rounded-md bg-white"
        onClick={() => auth.signOut()}
      >
        LOG OUT
      </button>
    </div>
  );
}
