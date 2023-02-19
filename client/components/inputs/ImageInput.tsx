// Libraries
// Types
// Components/Assets
import { ImageInputProps } from "@/types/components";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
