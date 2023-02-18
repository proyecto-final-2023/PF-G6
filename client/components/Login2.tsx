import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Image from "next/dist/client/image";
import blankProfile from "../assets/img/blankProfile.png";
import { useEffect } from "react";

export const Login2 = () => {
  const [user, setUser] = useAuthState(auth);
  const facebookAuth = new FacebookAuthProvider();
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, facebookAuth);
      console.log("logge in Success :D");
    } catch (error) {
      console.log("USER CLOSED POP UP");
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const loginimg = () => {
    if (user) return user.photoURL;
    else return blankProfile;
  };

  return (
    <>
      <p className="text-sm">LOGIN WITH FACEBOOK</p>
      <button className="text-green-400 rounded-md bg-white" onClick={login}>
        Facebook Log in
      </button>
      {user ? "Welcome, " + user.displayName + " e-mail : " + user.email : ""}
      <Image src={loginimg() as string} width={50} height={50} alt="a" />
      <br></br>
      <button
        className="text-green-400 rounded-md bg-white"
        onClick={() => auth.signOut()}
      >
        Facebook Log out
      </button>
    </>
  );
};
