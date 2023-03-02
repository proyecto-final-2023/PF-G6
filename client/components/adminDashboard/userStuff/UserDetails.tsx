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
    formState: { errors },
  } = useForm<UserDetailsType>({
    mode: "onChange",
    defaultValues: {
      first_name: "juanito",
      last_name: "pochoclo",
      nickname: "tomaton",
    },
  });

  const onSubmit: SubmitHandler<UserDetailsType> = async (data) => {
    console.log("SUBMIT", data);
    // await axios(`${process.env.NEXT_PUBLIC_FRONT_DEPLOY}`)
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

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

        <label className="flex flex-col">
          Logo:
          <input
            className="rounded-md"
            type="file"
            {...register("logo", { required: true })}
          />
        </label>
      </form>
    </div>
  );
}
