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
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/activity/filter/target/pectorals?page=${currentPage}`
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
        <div className="flex justify-between items-center w-full pt-[115px] px-36">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
        <div className="text-xl font-bold">{currentPage}</div>
        <button
          onClick={nextPage}
          disabled={rndExercises.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
      <div className="flex flex-wrap gap-20">
        <ul className="grid grid-cols-4 gap-4 mx-auto">
          {rndExercises.slice(0, 30).map((ex) => {return (
            <li className="w-1/4 rounded-sm bg-slate-500">
              <Link
          href={"/trainer/exercise/" + ex.id}
          replace
          key={ex.id}
          className="rounded-sm bg-slate-500"
        >
          <p>Body part {ex.bodyPart}</p>
          <Image src={ex.gifUrl} alt="" width={300} height={300} />
        </Link>
            </li>
          )})}
        
        </ul>
      </div>
      <div className="flex justify-between items-center w-full mt-10 px-36">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
          <div className="text-xl font-bold">{currentPage}</div>
        <button
          onClick={nextPage}
          disabled={rndExercises.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
  </div>
    
  );
}