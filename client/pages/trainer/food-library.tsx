import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import { FoodResType } from "@/types/components/libraries";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";

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
      <NavigationBtns
        {...{ currentPage }}
        {...{ prevPage }}
        {...{ nextPage }}
        length={foods.length}
      />

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
      </div>

      <NavigationBtns
        {...{ currentPage }}
        {...{ prevPage }}
        {...{ nextPage }}
        length={foods.length}
      />
    </div>
  );
}
