import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CardData {
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
}

function CardList() {
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<CardData[]>(
        `https://fp-server-cg2b.onrender.com/aliment?page=${page}`
      )
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
    <div className="h-auto flex justify-center bg-[url('/bgs/food.jpeg')] bg-repeat-y bg-cover backdrop-blur-sm]">
        <div className="mb-[28vh] bg-gray-600 w-[80%] grid grid-row grid-cols-2 gap-10 mt-[14vh] justify-center h-auto items-center rounded-md text-md font-bold cursor-pointer">
          {data.map((item) => (
            <div className=' bg-red-800 w-[100%]' key={item.id}>
              <h2>{item.dataType}</h2>
              <p>{item.description}</p>
              <p>
                Protein: {item.proteinAmount} {item.proteinUnit}
              </p>
              <p>
                Carbs: {item.carbohydrateAmount} {item.carbohydrateUnit}
              </p>
              <p>
                Fat: {item.fatTotalAmount} {item.fatTotalUnit}
              </p>
              <p>
                Sugars: {item.sugarsAmount} {item.sugarsUnit}
              </p>
              <p>
                Sodium: {item.sodiumAmount} {item.sodiumUnit}
              </p>
              <p>
                Cholesterol: {item.cholesterolAmount} {item.cholesterolUnit}
              </p>
              <p>
                Energy: {item.energyAmount} {item.energyUnit}
              </p>
              <hr />
            </div>
          ))}

          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
    </div>
  );
}

export default CardList;