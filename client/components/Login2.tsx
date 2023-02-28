import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import blankProfile from "../assets/img/blankProfile.png";
import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { setCookie } from "@/utils/cookieHandler";
import { useState } from "react";
import Modal from "react-modal";

interface UserInfo {
  email: string | null;
  authExtern: boolean;
  user:{
    email:string|null;
    displayName:string|null;
  }
}

export const Login2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const [email, setEmail] = useState(user?.email);
  const [inputValue, setInputValue] = useState("")
  const facebookAuth = new FacebookAuthProvider();
  console.log(user)


  const login = async () => {
    if (!user) {
      const result = await signInWithPopup(auth, facebookAuth);
      if (user && !user?.email) {
        setIsOpen(true)
      }
    }
  }

  useEffect(() => {
    setEmail(user?.email);
  }, [user]);


  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputValue.toString());
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }



  // useEffect(() => {
  //   const info = {
  //     first_name: user?.displayName.split(" ")[0],
  //     last_name: user?.displayName.split(" ")[1],
  //     email: user?.email || email,
  //     password:"941310",
  //     authExtern: true
  //   };

  //   console.log(info)
  
  //   if (info.first_name) {
  //     axios.post("http://localhost:3001/createuser", info)
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }
  // }, [user, email]);
  
  

  
  useEffect(() => {
    user?.email === null ? setIsOpen(true) : setIsOpen(false)

    // // //   a
  }, [user !== null]);



  const loginimg = () => {
    if (user) return user.photoURL;
    else return blankProfile;
  };

  return (
    <>
      <div className="">


        <button type="button" onClick={login} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
          <svg className="w-3 h-4 mr-2 -ml-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
          Sign in with Facebook
        </button>
        <Modal className="z-30 w-[100vw] block text-white mt-[30vh] bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800" isOpen={isOpen}>
          <h2 className="text-white">Oops! We couldn't get your email, please provide it to us to continue.</h2>

          <form onSubmit={handleModalSubmit}>
            <input
              className="mt-2"
              type="email"
              value={inputValue}
              onChange={handleChange}
            />


            <button className="ml-2 border-2 p-1 rounded-full border-white bg-blue-800 hover:bg-gray-800">Enviar</button>
          </form>
        </Modal >


      </div>

    </>
  );
};

