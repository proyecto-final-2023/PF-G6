import { GenericInputProps, InputData } from "@/types/components";
import { ContactData } from "@/pages/contact";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function TextAreaInput(props: GenericInputProps) {
  const { register, label, name, options, err } = props;

  return (
    <div>
      <label className="flex flex-col">
        {label}
        <input className="h-40 w-80" type = 'textarea' {...register(name as keyof InputData, options)} />
      </label>

      {err?.type && (
        <span className="text-red-400 uppercase">
          invalid {name.replace("_", " ")}
        </span>
      )}
    </div>
  );
}
