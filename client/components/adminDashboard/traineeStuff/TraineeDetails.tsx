import useStore from "@/store/dashStore";
import { SubmitHandler, useForm } from "react-hook-form";

type ModifyTraineeDetails = {
  logo: string;
  email: string;
};

export default function TraineeDetails({ user_id }: { user_id: string }) {
  // make a request to get the user details
  const traineeDetails = useStore((state) => state.traineeDetails);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ModifyTraineeDetails>({
    mode: "onChange",
    defaultValues: {
      logo: traineeDetails.logo,
      email: traineeDetails.email
    }
  });

  const onSubmit: SubmitHandler<ModifyTraineeDetails> = async (data) => {
    // update stuff
    console.log("update", data);
  };

  const handleDelete = () => {
    // delete stuff
    console.log("delete");
  };
  // do the useform stuff to update/remove details
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>Name: {traineeDetails.name}</p>
      <p>Role: Trainer</p>
      {/* ---- Logo ---- */}
      <label className="flex flex-col">
        Logo:
        <input
          className="rounded-md"
          type="text"
          {...register("logo", { required: true, minLength: 3 })}
        />
      </label>

      {/* ---- Email ---- */}
      <label className="flex flex-col">
        Email:
        <input
          className="rounded-md"
          type="text"
          {...register("email", { required: true, minLength: 3 })}
        />
      </label>

      {/* ---- Buttons ---- */}
      <button
        disabled={isSubmitting}
        className="py-2 px-3 bg-green-700 rounded"
      >
        Update
      </button>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={handleDelete}
        className="py-2 px-3 bg-red-700 rounded"
      >
        Delete
      </button>
    </form>
  );
}
