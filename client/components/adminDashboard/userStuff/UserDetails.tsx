import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/types/components/dashboard";

export default function UserDetails(props: User) {
  const { first_name, last_name, nickname, logo } = props;
  const requestType = useRef<"PUT" | "DELETE">("PUT");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      nickname: "",
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (requestType.current === "PUT") {
      // await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, data);
      console.log("READY TO UPDATE", data);
    } else {
      // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
      console.log("READY TO LOGIC DELETE", data);
    }
  };

  const updateValues = () => {
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("nickname", nickname);
  };

  useEffect(() => {
    updateValues();
  }, [first_name]);

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

        {/* BUTTONS :D */}
        <button
          onClick={() => (requestType.current = "PUT")}
          className="py-2 px-3 bg-green-700 rounded"
        >
          Update
        </button>
        <button
          onClick={() => (requestType.current = "DELETE")}
          className="py-2 px-3 bg-red-700 rounded"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
