import React, { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import blankProfile from "../assets/img/blankProfile.png";
import Image, { StaticImageData } from "next/dist/client/image";



export const Login = () => {

  
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
    <div>
      <p className="text-sm">LOGIN WITH GOOGLE</p>
      <button className="text-green-400 rounded-md bg-white" onClick={login}>
        Google Login
      </button>
      {user ? "Welcome, " + user.displayName + " e-mail : " + user.email : ""}
      <Image src={loginimg()} width={50} height={50} alt="a" />
      <br></br>
      <button
        className="text-green-400 rounded-md bg-white"
        onClick={() => auth.signOut()}
      >
        Google Log out
      </button>
    </div>
  );
};
