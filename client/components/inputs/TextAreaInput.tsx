import { GenericInputProps, InputData } from "@/types/components";
import { ContactData } from "@/pages/contact";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function TextAreaInput(props: GenericInputProps) {
  const { register, label, name, options, err } = props;

  return (
    <div className="p-2">
      <label className="flex flex-col text-lg">
        {label}
        <textarea
          className="h-24 w-[23.8rem] whitespace-normal rounded-md resize-none"
          placeholder="Enter your message"
          {...register(name as keyof InputData, options)}
        />
      </label>

      {err?.type && (
        <span className="text-red-400 uppercase">
          invalid {name.replace("_", " ")}
        </span>
      )}
    </div>
  );
}
