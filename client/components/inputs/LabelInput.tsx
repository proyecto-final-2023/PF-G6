import React from "react";

interface LabelInputProps {
  label: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number" | "password";
  name: string;
  value: string;
}

export default function LabelInput(props: LabelInputProps) {
  const { label, changeHandler, type, name, value } = props;

  return (
    <label>
      {label}:
      <input
        onChange={changeHandler}
        {...{ type }}
        {...{ name }}
        {...{ value }}
      />
    </label>
  );
}
