import { FoodResType } from "@/types/components/libraries";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function FoodDetails() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [foodData, setFoodData] = useState<FoodResType>();

  const goBackHandler = () => {
    router.replace("/trainer/food-library");
  };

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/aliment/${id}`).then(({ data }) =>
      setFoodData(data)
    );
  }, []);

  return (
    <div className="mt-20">
      <p>Name: {foodData?.description}</p>
      <p>
        Energy: {foodData?.energyAmount} {foodData?.energylUnit}.
      </p>
      <p>
        Cholesterol: {foodData?.cholesterolAmount} {foodData?.cholesterolUnit}.
      </p>
      <p>
        Protein: {foodData?.proteinAmount} {foodData?.proteinUnit}.
      </p>
      <button
        className="bg-red-200 text-cyan-900 p-3 rounded-sm mt-10"
        onClick={goBackHandler}
      >
        Go back
      </button>
    </div>
  );
}
