// Libraries
// Types
import { InputData, TextareaInputProps } from "@/types/components";
// Components/Assets

export default function TextAreaInput(props: TextareaInputProps) {
  const { register, label, name, options, err } = props;

  return (
    <div>
      <label className="flex flex-col">
        {label}
        <input
          className="h-40 w-80"
          type="textarea"
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
