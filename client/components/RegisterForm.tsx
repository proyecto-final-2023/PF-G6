// Libraries
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
// Types
import { InputData } from "@/types/components";
// Components/Assets
import GenericInput from "./inputs/GenericInput";
import ImageInput from "./inputs/ImageInput";
import SelectInput from "./inputs/SelectInput";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputData>({ mode: "onChange" });
  // console.log(watch("example"));

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    console.log("SUBMIT", data);
    data.imgURL="";
    await axios.post("http://localhost:3001/createuser", data)
    .then((data) => {
      console.log(data);
    });
    // TODO:
    // handle coudlinary upload
    // add extra prop to object authExtern: false
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="caja-form ">
      <h1 className="p-5 ">Register Form</h1>
      <div className="caja">
      <GenericInput
        label="Enter your first name:"
        name="first_name"
        type="text"
        options={{ required: true, pattern: /^[a-zA-Z]{3,}$/ }}
        err={errors.first_name}
        {...{ register }}
      />

      <GenericInput
        label="Enter your last name:"
        name="last_name"
        type="text"
        options={{ required: true, pattern: /^[a-zA-Z ]{3,}$/ }}
        err={errors.last_name}
        {...{ register }}
      />

      <GenericInput
        label="Enter your nickname:"
        name="nick_name"
        type="text"
        options={{ required: false }}
        err={errors.nick_name}
        {...{ register }}
      />

      <GenericInput
        label="Enter your password:"
        name="password"
        type="password"
        options={{ required: false }}
        err={errors.password}
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
      />

      <SelectInput
        {...{ register }}
        label="Select your role:"
        name="role"
        selectOptions={["admin", "trainee", "trainer"]}
        options={{ required: false }}
        err={errors.role}
      />

      <SelectInput
        {...{ register }}
        label="Select your gender:"
        name="gender"
        options={{ required: false }}
        err={errors.gender}
        selectOptions={["male", "female", "other"]}
      />

      <ImageInput
        {...{ register }}
        label="Select a profile image"
        name="imageFile"
        options={{ required: false }}
        err={errors.imgFile}
      
      />

      <button className="button" type="submit">
        Submit
      </button>
      </div>

    </form>
  );
}