import {
  TrainerDetailsT,
  UserDetailsResponse
} from "@/types/components/dashboard";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type ModifyTrainerDetails = {
  logo: string;
  plan: string;
};

// ? Only be able to change Logo & Plan Details
export default function TrainerDetails({ user_id }: { user_id: string }) {
  const [trainerDetails, setTrainerDetails] = useState<TrainerDetailsT>();
  // was too much of a pain to pass another param to the submit handler
  const requestType = useRef<"PUT" | "DELETE">("PUT");

  // const changeTrainerDetails = () => {
  //   console.log("changeTrainerDetails");
  // };

  const fetchDetails = async () => {
    try {
      const { data }: { data: UserDetailsResponse } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}`
      );

      const parsedDetails = {
        // since we dont get an id back from the server, we need to add the one in params
        user_id,
        name: `${data.first_name} ${data.last_name}`,
        logo: data.imgURL
      };

      setTrainerDetails(parsedDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // dont need to wait for it
    fetchDetails();
  }, [user_id]);

  const deleteTrainer = async () => {
    try {
      // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
      console.log("deleteTrainer");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTrainer = async () => {
    try {
      // need to had cookies by headers (wait until I have admin acc)
      // await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_URL}/trainers/logo/${id}`,
      //   data
      // );
      console.log("updateTrainer");
    } catch (error) {
      console.error(error);
    }
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
    // setValue("logo", logo);
    // setValue("plan", plan);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>Name: {trainerDetails?.name}</p>
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
