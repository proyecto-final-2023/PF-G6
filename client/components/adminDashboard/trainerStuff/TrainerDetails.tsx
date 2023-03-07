import useStore from "@/store/dashStore";
import { SubmitHandler, useForm } from "react-hook-form";

export type ModifyTrainerDetails = {
  logo: string;
  email: string;
};

// ? Only be able to change Logo & Plan Details
// changeTrainerDetails: () => void;
// deleteTrainer: () => void;
// updateTrainer: () => void;
export default function TrainerDetails({ user_id }: { user_id: string }) {
  const trainerDetails = useStore((state) => state.trainerDetails);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ModifyTrainerDetails>({
    mode: "onChange",
    defaultValues: {
      logo: trainerDetails.logo,
      email: trainerDetails.email
    }
  });

  const onSubmit: SubmitHandler<ModifyTrainerDetails> = async (data) => {
    // update stuff
    console.log("update", data);
  };

  const handleDelete = () => {
    // delete stuff
    console.log("delete");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>Name: {trainerDetails.name}</p>
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
