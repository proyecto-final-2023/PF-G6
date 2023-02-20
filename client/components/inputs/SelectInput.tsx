// Libraries
// Types
import { InputData, SelectInputProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
