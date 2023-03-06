import { GenericInputProps, InputData } from "@/types/components";
import { ContactData } from "@/pages/contact";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function GenericInput(props: GenericInputProps) {
  const { register, label, name, type, options, err } = props;

  return (
    <div className="p-1">
      <label className="gap-3 flex flex-col text-lg">
        {label}
        <input className="rounded-md h-5" {...{ type }} {...register(name as keyof InputData, options)} />
      </label>

      {err?.type && (
        <p className="text-red-400 text-center uppercase absolute p-1">
          invalid {name.replace("_", " ")}    
        </p>
      )}
    </div>
  );
}
