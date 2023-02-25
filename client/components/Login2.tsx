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



export const Login2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const [email, setEmail] = useState(user?.email);
  const [inputValue,setInputValue]=useState("")
  const facebookAuth = new FacebookAuthProvider();
  console.log(user)

  const login = async () => {
     if (!user) {
       const result = await signInWithPopup(auth, facebookAuth);
       if(user && !user?.email){
        setIsOpen(true)
     

       }
      } }
      // realizar inicio de sesión con Firebase y el email ingresado
    
  
  const handleModalSubmit = () => {
    setEmail(inputValue)
    setIsOpen(false);
   
    // realizar inicio de sesión con Firebase y el email ingresado
  };
  
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const info={
    email: user?.email||email,
    authExtern:true }

    console.log(info)
  useEffect(() => {
    user?.email===null?setIsOpen(true):setIsOpen(false)

  // // //   a
  }, [user!==null]);
  // useEffect(() => {
  // axios
  //   .post("http://localhost:3001/createUser",info )
  //   .then((data) => {
  //     setCookie("token", data.data.token);
    
  //   })
  //   .catch((error) => {
  //     window.alert("Error Loggin in" + error);
  //   });
  // }, [handleModalSubmit]);


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
    <Modal className=" w-[100vw] block text-white mt-[30vh] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" isOpen={isOpen}>
        <h2 className="text-white">Oops! We couldn't get your email, please provide it to us to continue.</h2>
        
        <form><input className="mt-2"
          type="email"
          value={email??""}
          onChange={handleInputChange}
          
        />
        <button className="ml-2" onClick={handleModalSubmit}>Enviar</button>
        </form>
      </Modal >
      
      
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
};

