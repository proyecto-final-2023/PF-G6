import React, { useState,useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import blankProfile from "../assets/img/blankProfile.png";
import Image, { StaticImageData } from "next/dist/client/image";
import Router from "next/router";
import axios from 'axios'
import { setCookie } from "@/utils/cookieHandler";
import Modal from "react-modal";
import { getDisplayName } from "next/dist/shared/lib/utils";


interface UserInfo {
  email: string | null;
  authExtern: boolean;
  displayName:string | null
}


export const Login = () => {

  
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [inputValue, setInputValue] = useState("")

  

  const login = async () => {
try {
  if (!user) {
    const result = await signInWithPopup(auth,googleAuth);

   

     
  
    if (user && !user?.email) {
      setIsOpen(true)

     
    }
  }
} catch (error) {
  console.log(error)
  
}

  }

  // const info={
  //   first_name:user?.displayName.split(" ")[0],
  //   last_name:user?.displayName.split(" ")[1],
  //   email: user?.email || email,
  //   authExtern: true
  // }

  useEffect(() => {
    setEmail(user?.email);
  }, [user]);

  // useEffect( () => {
  //    axios.post("http://localhost:3001/createuser", info)
  //   .then((data) => {
  //     console.log(data);
  //   });
  // }, [info.first_name!==null]);



  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputValue.toString());
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {

    const info = {
      first_name: user?.displayName.split(" ")[0],
      last_name: user?.displayName.split(" ")[1],
      email: user?.email || email,
      password:user?.email||email,
    };
  
    if (info.first_name) {
      axios.post("http://localhost:3001/createuser", info)
        .then((data) => {
          console.log(data);
        });
    }
  }, [user?.displayName]);
  
  


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


      <button type="button" onClick={login} className="text-white m-2 bg-[#6f6f70] hover:bg-[#6f6f70]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
      <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
       Sign in with Google
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
  )
}