import registerInputsData from "@/assets/register-inputs-data";
import { InputData } from "@/types/components";

// ? ----------------------------------------// ? ----------------------------------------
// ? missing inputs
// imgURL: userBot.picture.large
// gender: userBot.gender
// rol: "bot"
// ? ---------------------------------------- DONE // ? ----------------------------------------
import { useForm, SubmitHandler } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputData>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<InputData> = (data) => console.log(data);
  // console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {registerInputsData.map((e) => {
        const { name, label, type } = e;

        return (
          <div key={label} className="flex flex-col">
            <label>
              {label}:
              <input
                {...{ type }}
                {...register(name as keyof InputData, { required: true })}
              />
            </label>

            {errors[name as keyof InputData] && (
              <span>This field is required</span>
            )}
          </div>
        );
      })}

      <button className="rounded-md bg-lime-500">Submit</button>
    </form>
  );
}
