import React, { useState, useEffect } from "react";
import axios from "axios";

export type CardData = {
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
  sugarsUnit: string;
  sodiumAmount: number;
  sodiumUnit: string;
  cholesterolAmount: number;
  cholesterolUnit: string;
  energyAmount: number;
  energyUnit: string | null;
};

function CardList() {
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<CardData[]>(`${process.env.NEXT_PUBLIC_API_URL}/aliment?page=${page}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" h-auto flex justify-center bg-[url('/bgs/food.jpeg')] bg-repeat-y bg-cover backdrop-blur-sm]">
      <div className="mb-[28vh] w-[80%] grid grid-row grid-cols-2 gap-10 mt-[14vh] justify-center h-auto items-center rounded-md text-md font-bold cursor-pointer">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-black"
        >
          🡰 Previous Page
        </button>
        <button onClick={handleNextPage} className="bg-black">
          Next Page 🡲
        </button>
        {data.map((item) => (
          <div
            className=" shadow-2xl offset-x-2 offset-y-2 blur-5 bg-gradient-to-t from-green-600 to-green-800 w-[100%] rounded-xl border border-gray-300 p-4 "
            key={item.id}
          >
            <h2>{item.dataType}</h2>
            <p className="bg-stone-900 flex justify-center">
              {item.description}
            </p>
            <div className="flex w-[94%]  m-4">
              <div className=" w-[50%]">
                <p>
                  Protein: {item.proteinAmount} {item.proteinUnit}
                </p>
                <p>
                  Carbs: {item.carbohydrateAmount} {item.carbohydrateUnit}
                </p>
                <p>
                  Fat: {item.fatTotalAmount} {item.fatTotalUnit}
                </p>
              </div>
              <div className=" w-[50%]">
                <p>
                  Sugars: {item.sugarsAmount} {item.sugarsUnit}
                </p>
                <p>
                  Sodium: {item.sodiumAmount} {item.sodiumUnit}
                </p>
              </div>
              <div className=" w-[50%]">
                <p>
                  Cholesterol: {item.cholesterolAmount} {item.cholesterolUnit}
                </p>
                <p>
                  Energy: {item.energyAmount} {item.energyUnit}
                </p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-black"
        >
          🡰 Previous Page
        </button>
        <button onClick={handleNextPage} className="bg-black">
          Next Page 🡲
        </button>
        <a
          className="text-center text-lg hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300"
          href="javascript:history.back()"
        >
          Go Back
        </a>
      </div>
    </div>
  );
}

export default CardList;
