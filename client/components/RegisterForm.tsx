import registerInputsData from "@/assets/register-inputs-data";
import { InputData } from "@/types/components";

// ? ----------------------------------------// ? ----------------------------------------
// ? missing inputs
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
  // console.log(watch("example"));

  const onSubmit: SubmitHandler<InputData> = (data) => {
    console.log(data);
    // TODO:
    // handle coudlinary upload
    // add extra prop to object externalLogin: false
    // add headers to auth
  };

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

      <input
        type="file"
        accept="image/png, image/jpeg"
        {...register("imgUrl" as keyof InputData, { required: true })}
      />

      {/* later on put a dropdown menu */}
      <input
        type="text"
        {...register("gender" as keyof InputData, { required: true })}
      />

      {/* later on put a dropdown menu */}
      <input
        type="text"
        {...register("rol" as keyof InputData, { required: true })}
      />

      {/* // imgURL: userBot.picture.large // gender: userBot.gender // rol: "bot" */}
      <button className="rounded-md bg-lime-500">Submit</button>
    </form>
  );
}
