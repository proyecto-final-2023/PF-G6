import { GenericInputProps, InputData } from "@/types/components";
import { ContactData } from "@/pages/contact";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function GenericInput(props: GenericInputProps) {
  const { register, label, name, type, options, err } = props;

  return (
    <div>
      <label className="gap-3">
        {label}
        <input className="rounded-md" {...{ type }} {...register(name as keyof InputData, options)} />
      </label>

      {err?.type && (
        <span className="text-red-400 uppercase">
          invalid {name.replace("_", " ")}
        </span>
      )}
    </div>
  );
}
