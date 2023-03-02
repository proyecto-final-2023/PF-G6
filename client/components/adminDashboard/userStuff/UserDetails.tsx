import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type UserDetailsType = {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  logo: string;
};

export default function UserDetails({ details }: { details: UserDetailsType }) {
  const { first_name, last_name, nickname, logo } = details;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserDetailsType>({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      nickname: "",
    },
  });

  const onSubmit: SubmitHandler<UserDetailsType> = async (data) => {
    console.log("SUBMIT", data);
    // await axios(`${process.env.NEXT_PUBLIC_FRONT_DEPLOY}`)
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  const updateValues = () => {
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("nickname", nickname);
  };

  useEffect(() => {
    updateValues();
  }, [details]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="flex flex-col">
          First Name:
          <input
            className="rounded-md"
            type="text"
            {...register("first_name", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Last Name:
          <input
            className="rounded-md"
            type="text"
            {...register("last_name", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Nickname:
          <input
            className="rounded-md"
            type="text"
            {...register("nickname", { required: true })}
          />
        </label>

        {logo && (
          <label className="flex flex-col">
            Logo:
            <input
              className="rounded-md"
              type="file"
              {...register("logo", { required: true })}
            />
          </label>
        )}

        <button className="py-2 px-3 bg-green-700 rounded">Update</button>
        <button className="py-2 px-3 bg-red-700 rounded">Delete</button>
      </form>
    </div>
  );
}
