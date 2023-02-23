import React from "react";
import Link from "next/link";
import { CardPlansProps } from "@/types/components";

export default function CardPlans(props: CardPlansProps) {
  const { name, cost, category, description } = props;

  return (
    <Link href="paypal">
      <div className="m-50 py-5 ">
        <div className=" bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 rounded-t-lg text-center font-bold text-xl text-white   w-40   ">
          {name}
        </div>
        <p className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-centerw-40 text-center text-white   text-4xl">
          {cost}USD
        </p>
        <p className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-white  w-40 ">
          {category}
        </p>
        <p className="  bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-white   h-40 text-3x1 ">
          {description}
        </p>
        <p className="bg-white  rounded-b-lg w-40 h-10"></p>
      </div>
    </Link>
  );
}
