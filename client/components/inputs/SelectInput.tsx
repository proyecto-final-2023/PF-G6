import { InputData } from "@/types/components";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface SelectInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  name: string;
  selectOptions: string[];
  options: { required: boolean; regex?: RegExp };
  err: FieldError | undefined;
}

export default function SelectInput(props: SelectInputProps) {
  const { register, label, name, selectOptions, options, err } = props;

  return (
    <div>
      <label className="flex gap-5">
        {label}
        <select
          {...register(name as keyof InputData, options)}
          className="w-1/3 rounded-md"
        >
          <option value={""}>---</option>
          {selectOptions.map((value) => {
            return (
              <option key={value} {...{ value }}>
                {value[0].toUpperCase() + value.slice(1)}
              </option>
            );
          })}
        </select>
      </label>

      {err?.type && <span>{err?.message}</span>}
    </div>
  );
}
