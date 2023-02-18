import { React, useState } from "react";
import Image from "next/image";

export default function Index() {
  const [progress, setProgress] = useState("0");

  return (
    <div>
      <h1>Progress:{progress}%</h1>
      <Image />
      Foto
      <h2>Trainer Name</h2>
      <h3>Today's Food Plan</h3>
      <h3>Today's Excercise Plan</h3>
      <h3>CRONOGRAMA SEMANAL</h3>
    </div>
  );
}
