import { ExerciesResType } from "@/types/components/libraries";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ExerciseDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [exerciseData, setExerciseData] = useState<ExerciesResType>();

  const goBackHandler = () => {
    router.replace("/trainer/exercises-library");
  };

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/activity/${id}`).then(
      ({ data }) => setExerciseData(data)
    );
  }, []);

  return (
    <div className="">
      <Image
        src={exerciseData?.gifUrl || ""}
        alt="pog"
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
