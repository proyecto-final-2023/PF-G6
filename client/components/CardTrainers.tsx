import Link from "next/link";
import React from "react";
import ReactStars from "react-stars";

type CardTrainersProps = {
  id: string;
  photo: string;
  first_name: string;
  last_name: string;
  description?: string;
  rating: number | undefined;
};
// card trainers
const Card = ({ photo, first_name, last_name, id }: CardTrainersProps) => {
  return (
    <div className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex hover:drop-shadow-2xl  ">
        <img
          className=" justify-center m-8 rounded-full w-60  "
          src={photo}
          alt=""
          width={80}
          height={80}
        />
      </div>
      {/* <div className=" flex justify-center ">
        <ReactStars count={5} size={20} color2={"#b96607"} />
      </div> */}

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {first_name}
        </h5>
        <p className="mb-2  font-bold tracking-tight text-white">{last_name}</p>

        <p className="mb-3 font-normal text-white">
          Change your life today. Don't gamble on the future, act now, without
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
