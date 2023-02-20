// Libraries
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// Types
// Components/Assets
import { auth } from "../firebase";
import Image from "next/image";
import blankProfile from "../assets/img/blankProfile.png";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Login2() {
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
      <div className="">
        <button
          type="button"
          onClick={login}
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
        >
          <svg
            className="w-3 h-4 mr-2 -ml-2"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="facebook-f"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
            ></path>
          </svg>
          Sign in with Facebook
        </button>

        {/* {user ? "Welcome, " + user.displayName + " e-mail : " + user.email : ""}
      <Image src={loginimg() as string} width={50} height={50} alt="a" />
      <br></br>
      <button
        className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => auth.signOut()}
      >
        Log out
      </button> */}
      </div>
    </>
  );
}
