import React, {useState} from "react";
import axios from "axios";
import GenericInput from "@/components/inputs/GenericInput";
import { useForm, SubmitHandler } from 'react-hook-form'
import TextAreaInput from "@/components/inputs/TextAreaInput";


export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}
 
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactData>({ mode: "onBlur" });
  // console.log(watch("example"));

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    console.log("SUBMIT", data);
      axios.post('http://localhost:3001/contact', data)
  
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  };

  return (
    <div className="h-[82.5vh] flex justify-center bg-[url('/bgs/contact.jpg')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className="bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 w-[30vw] m-auto text-m">
        <div className="grid grid-cols-1 gap-1 justify-items-center h-[70vh] py-11">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mx-6">
      <GenericInput
        label="Enter your name:"
        name="name"
        type="text"
        options={{ required: true, pattern: /^[a-zA-Z ]{3,}$/ }}
        err={errors.name}
        {...{ register }}
      />

      <GenericInput
        label="Enter your email:"
        name="email"
        type="text"
        options={{ required: false }}
        err={errors.email}
        {...{ register }}
      />

      <GenericInput
        label="Subject:"
        name="subject"
        type="text"
        options={{ required: true, pattern: /^[a-zA-Z 0-9]{3,}$/ }}
        err={errors.subject}
        {...{ register }}
      />

      <TextAreaInput
        label="Enter your message:"
        name="message"
        type="textarea"
        options={{ required: false }}
        err={errors.message}
        {...{ register }}
      />

      <button className="text-xl hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300" type="submit">
        Submit
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}
