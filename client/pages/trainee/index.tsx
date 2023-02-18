import { useState } from "react";
import Image from "next/image";

export default function Index() {
  const [progress, setProgress] = useState("0");

  return (
    <div>
      <h1>Progress:{progress}%</h1>
    </div>
  );
}
