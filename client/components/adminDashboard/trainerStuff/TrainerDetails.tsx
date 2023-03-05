import { TrainerDetailsT } from "@/types/components/dashboard";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type ModifyTrainerDetails = {
  logo: string;
  plan: string;
};

// ? Only be able to change Logo & Plan Details
export default function TrainerDetails(props: TrainerDetailsT) {
  const { user_id, name, logo } = props;
  // was too much of a pain to pass another param to the submit handler
  const requestType = useRef<"PUT" | "DELETE">("PUT");

  // const changeTrainerDetails = () => {
  //   console.log("changeTrainerDetails");
  // };

  const deleteTrainer = async () => {
    // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
    console.log("deleteTrainer");
  };

  const updateTrainer = async () => {
    // need to had cookies by headers (wait until I have admin acc)
    // await axios.put(
    //   `${process.env.NEXT_PUBLIC_API_URL}/trainers/logo/${id}`,
    //   data
    // );
    console.log("updateTrainer");
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ModifyTrainerDetails>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      plan: ""
    }
  });
  const onSubmit: SubmitHandler<ModifyTrainerDetails> = async (data) => {
    if (requestType.current === "PUT") {
      // add some stuff, like what it want to edit, id of the user, etc
      await updateTrainer();
      console.log("READY TO UPDATE", data);
    } else {
      await deleteTrainer();
      console.log("READY TO LOGIC DELETE", data);
    }
  };
  const updateValues = () => {
    setValue("logo", logo);
    // setValue("plan", plan);
  };

  useEffect(() => {
    updateValues();
  }, [name]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>Name: {name}</p>
      <p>Role: Trainer</p>
      <label className="flex flex-col">
        Logo
        <input
          className="rounded-md"
          type="text"
          {...register("logo", { required: true, minLength: 3 })}
        />
      </label>

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
  );
}
