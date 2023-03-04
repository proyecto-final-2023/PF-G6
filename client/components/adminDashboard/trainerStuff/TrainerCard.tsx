import React from "react";
import { TrainerCardT } from "./TrainerContainer";

export default function TrainerCard(props: TrainerCardT) {
  const { name, clickHandler, id_trainer, role } = props;

  return (
    <button onClick={() => clickHandler(id_trainer)}>
      <p>{name}</p>
      <p>role: {role}</p>
    </button>
  );
}
