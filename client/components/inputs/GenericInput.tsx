// Libraries
import { FieldError, UseFormRegister } from "react-hook-form";
// Types
import { GenericInputProps, InputData } from "@/types/components";
// Components/Assets
import { ContactData } from "@/pages/contact";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
