import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import { ExerciesResType } from "@/types/components/libraries";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ExercisesLibrary() {
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(
          `${process.env.NEXT_PUBLIC_API_URL}/activity?page=${currentPage}`
        );
        setRndExercises(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <NavigationBtns
        {...{ currentPage }}
        {...{ prevPage }}
        {...{ nextPage }}
        length={rndExercises.length}
      />

      <div className="flex flex-wrap gap-20">
        {rndExercises.slice(0, 30).map((ex) => (
          <Link
            href={"/trainer/exercise/" + ex.id}
            replace
            key={ex.id}
            className="w-1/4 rounded-sm bg-slate-500"
          >
            <p>Body part {ex.bodyPart}</p>
            <Image
              src={ex.gifUrl || ""}
              alt="missin img"
              width={300}
              height={300}
            />
          </Link>
        ))}
      </div>

      <NavigationBtns
        {...{ currentPage }}
        {...{ prevPage }}
        {...{ nextPage }}
        length={rndExercises.length}
      />
    </div>
  );
}
