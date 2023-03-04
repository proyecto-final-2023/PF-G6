import { Plan } from "@/types/components/dashboard";
import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function PlanDetails(props: Plan) {
  const { id, name, description, price, duration, features, logo } = props;
  const requestType = useRef<"PUT" | "DELETE">("PUT");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Plan>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 0
    }
  });

  const onSubmit: SubmitHandler<Plan> = async (data) => {
    if (requestType.current === "PUT") {
      // await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, data);
      console.log("READY TO UPDATE", data);
    } else {
      // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
      console.log("READY TO LOGIC DELETE", data);
    }
  };

  const updateValues = () => {
    setValue("name", name);
    setValue("description", description);
    setValue("price", price);
    setValue("duration", duration);
  };

  useEffect(() => {
    updateValues();
  }, [name]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="flex flex-col">
          Name:
          <input
            className="rounded-md"
            type="text"
            {...register("name", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Description:
          <input
            className="rounded-md"
            type="text"
            {...register("description", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Price:
          <input
            className="rounded-md"
            type="number"
            {...register("price", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Duration:
          <input
            className="rounded-md"
            type="number"
            {...register("duration", { required: true })}
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
    </div>
  );
}
