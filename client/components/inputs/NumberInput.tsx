import { UseFormRegister } from "react-hook-form";

export type NumberInputProps = {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  options: { required: boolean; regex?: RegExp };
  err: any;
};

export default function NumberInput(props: NumberInputProps) {
  const { register, label, name, options, err } = props;

  return (
    <div className="gap-3 flex flex-col justify-center items-center">
      <label className="text-lg relative top-4">{label}</label>

      <input
        className="rounded-md"
        type="number"
        {...register(name, options)}
      />

      {err?.type && (
        <p className="text-red-400 text-center uppercase">
          invalid {name.replace("_", " ")}
        </p>
      )}
    </div>
  );
}
