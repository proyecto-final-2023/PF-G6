import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, AuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios'
import { setCookie } from "@/utils/cookieHandler";
import Modal from 'react-modal';
import { getAuth, updateEmail } from "firebase/auth";





interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}


export const Login = () => {

  const [user, setUser] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider();
  const facebookAuth = new FacebookAuthProvider()
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(user?.email || null);
  const [inputValue, setInputValue] = useState("");
  const auth1 = getAuth()

  // console.log(user?.email)

  const login = async (authType: AuthProvider) => {
    try {
      if (!user) {
        const result = await signInWithPopup(auth, authType);
      }
      if (user && !user?.email) {
        setIsOpen(true)
      }

    }

    catch (error) {
      console.log(error)

    }

  }


  useEffect(() => {
    setEmail(user?.email || "no Email");
  }, [user]);


  const info = {
    first_name: user?.displayName?.split(" ")[0],
    last_name: user?.displayName?.split(" ")[1],
    email: user?.email || email,
    password: user?.email || email,
  };

  // console.log(info)

  const infoLoguin = {
    email: info.email,
    password: info.email,
    authExtern: true
  }

  useEffect(() => {
    if (user !== null && info.email !== undefined) {
      console.log(info.email)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/email`, { email: info.email })
        .then(response => {
          console.log(response.data.verify)
          if (response.data.verify === true) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, infoLoguin)
              .then(response => {
                setCookie("token", response.data.token)
                console.log(response)
                window.location.href = "/home"

              })
              .catch(error => {
                console.log(error)
              });
          } else if (response.data.verify === false) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createuser`, info)
              .then(response => {
                auth.signOut();
                // console.log(response)
                window.location.reload()
              })
              .catch(error => {
                console.log(error)
              });
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }, [user?.email || info.email]);



  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputValue.toString());
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }


  useEffect(() => {
    user?.email === null ? setIsOpen(true) : setIsOpen(false)

    // // //   a
  }, [user !== null]);

  useEffect(() => {
    if (auth1?.currentUser && email) {
      updateEmail(auth1.currentUser, email).then(() => {
        // Email updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
  }, [email]);

  return (
    <>
      <div className="flex flex-col">


        <button type="button" onClick={() => login(googleAuth)} className="text-white m-2 bg-[#6f6f70] hover:bg-[#6f6f70]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Sign in / Log in with Google
        </button>

        <button type="button" onClick={() => login(facebookAuth)} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
          <svg className="w-3 h-4 mr-2 -ml-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
          Sign in / Log in with Facebook
        </button>

        <div className="flex flex-row">
          <Modal ariaHideApp={false} className="bg-[url('/tail-imgs/logo2.png')] bg-center bg-[length:150px] pt-12 m-auto z-30 h-[30vh] w-[50vw] block text-white mt-[30vh] bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800" isOpen={isOpen}>
            <h2 className="text-black text-[3em] leading-10 text-shadow ">Oops! We couldn't get your email, please provide it to us to continue.</h2>

            <form onSubmit={handleModalSubmit}>
              <input
                className="mt-6 h-8 w-[30vw]"
                type="email"
                value={inputValue}
                onChange={handleChange}
              />


              <button className="text-lg hover:text-yellow-600 border-2 bg-slate-600 hover:border-none hover:bg-gray-800 items-center w-20 ml-2 self-center rounded-xl">Enviar</button>
            </form>
          </Modal >
        </div>

      </div>

    </>
  )
}