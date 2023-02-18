import { InputData } from "@/types/components";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface ImageInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  name: string;
  options: { required: boolean; regex?: RegExp };
  err: FieldError | undefined;
}

export default function ImageInput(props: ImageInputProps) {
  const { register, label, name, options, err } = props;

  return (
    <div>
      <label className="flex flex-col">
        Choose a profile image:
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("imgFile", { required: false })}
        />
      </label>
    </div>
  );
}
