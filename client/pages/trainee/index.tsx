// Libraries
import { useState } from "react";
// Types
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Index() {
  const [progress, setProgress] = useState("0");

  return (
    <div>
      <h1>Progress:{progress}%</h1>
      Foto
      <h2>Trainer Name</h2>
      <h3>Today's Food Plan</h3>
      <h3>Today's Excercise Plan</h3>
      <h3>CRONOGRAMA SEMANAL</h3>
    </div>
  );
}
