import { InputData } from "@/types/components";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface GenericInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  options: { required: boolean; pattern?: RegExp };
  err: FieldError | undefined;
  name: string;
  type: "text" | "number" | "password" | "email";
}

export default function GenericInput(props: GenericInputProps) {
  const { register, label, name, type, options, err } = props;

  return (
    <div>
      <label className="flex flex-col">
        {label}
        <input {...{ type }} {...register(name as keyof InputData, options)} />
      </label>

      {err?.type && (
        <span className="text-red-400 uppercase">
          invalid {name.replace("_", " ")}
        </span>
      )}
    </div>
  );
}
