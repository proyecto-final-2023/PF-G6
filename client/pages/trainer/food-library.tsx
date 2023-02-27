import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";

export type FoodResType = {
  id: number;
  dataType: string;
  description: string;
  proteinAmount: number;
  proteinUnit: string;
  carbohydrateAmount: number;
  carbohydrateUnit: string;
  fatTransAmount: number;
  fatTransUnit: string;
  fatSaturatedAmount: number;
  fatSaturatedUnit: string;
  fatTotalAmount: number;
  fatTotalUnit: string;
  sugarsAmount: number;
  sugarsdUnit: string;
  sodiumAmount: number;
  sodiumUnit: string;
  cholesterolAmount: number;
  cholesterolUnit: string;
  energyAmount: number;
  energylUnit: string;
};

export default function FoodLibrary() {
  const [foods, setFoods] = useState<FoodResType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(
          `${process.env.NEXT_PUBLIC_API_URL}/aliment?page=${currentPage}`
        );
        setFoods(data);
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
          disabled={foods.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
      <div className="flex flex-wrap gap-20">
        {foods.slice(0, 30).map((food) => (
          <Link
            href={"/trainer/food/" + food.id}
            replace
            key={food.id}
            className="w-1/4 rounded-sm bg-slate-500"
          >
            <p>{food.description}</p>
            <FaHamburger />
          </Link>
        ))}
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
            disabled={foods.length === 0}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
