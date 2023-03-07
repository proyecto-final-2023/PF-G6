import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"


import { InputData } from "@/types/components";

import GenericInput from "./inputs/GenericInput";

import Image from "next/image";
import logoImg from "@/assets/images/placeholder-logo.png";

import Link from "next/dist/client/link"
import { auth } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";

type ValidatePasswordConfirmation = (value: string) => boolean | string;
// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<InputData>({ mode: "onBlur" });
  // console.log(watch("example"));
  const [user, setUser] = useAuthState(auth);

  // console.log(user)

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    // console.log("SUBMIT", data);
    // data.imgURL = "";
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createuser`, 
    { first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    })
      .then((data) => {
        // console.log(data);
        alert("User created successfully! please verify the confirmation E-mail.");
        window.location.href = "/login"
      })
      .catch((err)=>{
        console.log(err)
      })
   

  };

  const validatePasswordConfirmation: ValidatePasswordConfirmation = (value: string) => {
    const password = getValues("password");
    return password === value || "Passwords must match";
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="caja-form">

        <div className="caja">
          <Image
            src={logoImg}
            width={120}
            alt={`link of the whole app`}
            className=" pt-8  "
          />
          <p className="p-5 text-center leading-none">Welcome to Fit U App, please complete the form to register</p>
          <p className="leading-none -mt-5">Do you have an account? Please <Link className="text-orange-500 hover:text-yellow-500" href={"/login"}>Login</Link></p>
          <GenericInput
            label="Enter your first name: "
            name="first_name"
            type="text"
            options={{ required: true, pattern: /^[a-zA-Z]{3,}$/, validate: null }}
            err={errors.first_name}
            {...{ register }}
          />

          <GenericInput
            label="Enter your last name: "
            name="last_name"
            type="text"
            options={{ required: true, pattern: /^[a-zA-Z ]{3,}$/, validate: null }}
            err={errors.last_name}
            {...{ register }}
          />

          <GenericInput
            label="Enter your email: "
            name="email"
            type="text"
            options={{ required: false, validate: null }}
            err={errors.email}
            {...{ register }}
          />
          {/* <GenericInput
        label="Enter your nickname: "
        name="nickname"
        type="text"
        options={{ required: false }}
        err={errors.nick_name}
        {...{ register }}
      /> */}

          <GenericInput
            label="Enter your password: "
            name="password"
            type="password"
            options={{ required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/><.,])(?=.*\S).{8,}$/, validate: null }}
            err={errors.password}
            {...{ register }}
          />

          <GenericInput
            label="Confirm your password: "
            name="password_confirmation"
            type="password"
            options={{ required: true, validate: validatePasswordConfirmation }}
            err={errors.password_confirmation}
            {...{ register }}
          />




          {/* <GenericInput
        label="Enter your mobile phone number:"
        name="cell"
        type="text"
        options={{ required: false }}
        err={errors.cell}
        {...{ register }}
      />

      <GenericInput
        label="Enter your home number:"
        name="phone"
        type="text"
        options={{ required: false }}
        err={errors.phone}
        {...{ register }}
      />

      <GenericInput
        label="Enter your home number:"
        name="email"
        type="email"
        options={{ required: false }}
        err={errors.email}
        {...{ register }}
      /> */}
          {/* 
      <SelectInput
        {...{ register }}
        label="Select your role: "
        name="role"
        selectOptions={["trainee", "trainer"]}
        options={{ required: false }}
        err={errors.role}
      /> */}

          {/* <SelectInput
        {...{ register }}
        label="Select your gender:"
        name="gender"
        options={{ required: false }}
        err={errors.gender}
        selectOptions={["male", "female", "other"]}
      /> */}
          {/* <GenericInput
        label="URL of your image: "
        name="imgURL"
        type="text"
        options={{ required: false }}
        err={errors.imgURL}
        {...{ register }}
      /> */}
          {/* <ImageInput
        {...{ register }}
        label="Select a profile image"
        name="imageFile"
        options={{ required: false }}
        err={errors.imgFile}
      
      /> */}

          <button className="button" type="submit">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}