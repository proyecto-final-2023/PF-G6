import { useForm, SubmitHandler } from "react-hook-form";

type ModifyUser = {
  name: string;
  role: string;
};
export default function UserDetails() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ModifyUser>({
    mode: "onChange",
    defaultValues: {
      name: "",
      role: ""
    }
  });

  const onSubmit: SubmitHandler<ModifyUser> = async (data) => {
    console.log("READY TO UPDATE", data);
  };

  const handleDelete = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="flex flex-col">
          Nickname:
          <input
            className="rounded-md"
            type="text"
            {...register("name", { required: true })}
          />
        </label>

        {/* BUTTONS :D */}
        <button className="py-2 px-3 bg-green-700 rounded">Update</button>

        <button
          type="button"
          onClick={() => handleDelete()}
          className="py-2 px-3 bg-red-700 rounded"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
