import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type ResType = {
  bodyPart: string;
  equipement: string;
  gifUrl: string;
  id: number;
  name: string;
  target: string;
};

export default function ExercisesLibrary() {
  const [rndExercises, setRndExercises] = useState<ResType[]>([]);

  useEffect(() => {
    axios("http://localhost:3001/activity/filter/target/pectorals").then(
      ({ data }) => setRndExercises(data)
    );
  }, []);

  return (
    <div className="flex flex-wrap gap-20">
      {rndExercises.slice(0, 30).map((ex) => (
        <Link
          href={"/trainer/exercise/" + ex.id}
          replace
          key={ex.id}
          className="w-1/4 rounded-sm bg-slate-500"
        >
          <p>Body part {ex.bodyPart}</p>
          <Image src={ex.gifUrl} alt="" width={300} height={300} />
        </Link>
      ))}
    </div>
  );
}
