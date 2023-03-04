import Link from "next/link";
import React from "react";
import ReactStars from "react-stars";

// card trainers
const Card = ({ photo, first_name, last_name, rating, id }) => {
  return (
    <div className="max-w-sm  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex   hover:drop-shadow-2xl  ">
        <img
          className=" justify-center m-8 rounded-full w-80 "
          src={photo}
          alt=""
          width={50}
          height={50}
        />
      </div>
      <div className=" flex justify-center ">
        <ReactStars count={5} size={20} color2={"#b96607"} />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {first_name}
        </h5>
        <p className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
          {last_name}
        </p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Change your life today. Don’t gamble on the future, act now, without
          delay.
        </p>
        <Link
          href={`/trainer/trainers/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-700  "
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
