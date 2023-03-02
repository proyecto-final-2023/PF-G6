import React from "react";
import {useForm } from "react-hook-form"

type InputForm = {
  name:string;
  age:number;
}
export default function PlanDetails() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputForm>({ mode: "onChange" });

  return <div>PlanDetails</div>;
}
