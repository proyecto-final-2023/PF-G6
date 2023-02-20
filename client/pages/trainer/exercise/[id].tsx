// Libraries
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// Types
import { ResType } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function ExerciseDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [exerciseData, setExerciseData] = useState<ResType>();

  const goBackHandler = () => {
    router.replace("/trainer/exercises-library");
  };

  useEffect(() => {
    axios("http://localhost:3001/activity/" + id).then(({ data }) =>
      setExerciseData(data)
    );
  }, []);

  return (
    <div className="">
      <Image
        src={exerciseData?.gifUrl as string}
        alt=""
        width={300}
        height={300}
        className="w-2/3"
      />
      <p>Name: {exerciseData?.name}</p>
      <p>Body part: {exerciseData?.bodyPart}</p>
      <p>Equipement: {exerciseData?.equipement}</p>
      <p>Target: {exerciseData?.target}</p>
      <button
        className="bg-red-200 text-cyan-900 p-3 rounded-sm"
        onClick={goBackHandler}
      >
        Go back
      </button>
    </div>
  );
}
