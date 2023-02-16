import { useState } from "react";
import LabelInput from "./inputs/LabelInput";
import registerInputsData from "@/assets/register-inputs-data";
import { InputsData, RegisterFormState } from "@/types/components";

// TODO: install react-hook-form
function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormState["formData"]>({
    first_name: "",
    last_name: "",
    nick_name: "",
    password: "",
    email: "",
    phone: "",
    cell: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // ? missing inputs
  // imgURL: userBot.picture.large,
  // gender: userBot.gender,
  // rol: "bot",
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      {registerInputsData.map((inputData) => {
        const { label, name, type } = inputData;

        return (
          <LabelInput
            key={name}
            changeHandler={handleChange}
            value={formData[name as keyof RegisterFormState["formData"]]}
            {...{ label }}
            {...{ name }}
            {...{ type }}
          />
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

// ? ----------------------------------------// ? ----------------------------------------

// ? ----------------------------------------// ? ----------------------------------------

// ? ----------------------------------------// ? ----------------------------------------
import { useForm, SubmitHandler } from "react-hook-form";

type DataType = { label: string; name: string; type: string };

const data: DataType[] = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
  },
];

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataType>();
  const onSubmit: SubmitHandler<DataType> = (data) => console.log(data);

  // console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map((e) => {
        const { name, label, type } = e;

        return (
          <div key={label}>
            <label>
              {label}:
              <input type={type} {...register(name as keyof DataType)} />
            </label>
            {errors.name && <span>This field is required</span>}
          </div>
        );
      })}

      <input type="submit" />
    </form>
  );
}

export default App;
