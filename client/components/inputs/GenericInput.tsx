import { GenericInputProps, InputData } from "@/types/components";
import { ContactData } from "@/pages/contact";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function GenericInput(props: GenericInputProps) {
  const { register, label, name, type, options, err } = props;

  return (
    <div className="p-5">
      <label className="gap-3">
        {label}
        <input className="rounded-md" {...{ type }} {...register(name as keyof InputData, options)} />
      </label>

      {err?.type && (
        <p className="text-red-400 text-center uppercase absolute p-1">
          invalid {name.replace("_", " ")}    
        </p>
      )}
    </div>
  );
}
