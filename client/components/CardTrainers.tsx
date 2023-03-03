import Link from "next/link";
import React from "react";

// card trainers
const Card = ({ photo, first_name, last_name, rating, id }) => {
  return (
    <Link href={`/trainer/trainers/${id}`}>
      <div className="flex flex-grow   bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img src={photo} alt={name} className="card__photo" />
        <div className="p-4">
          <h2 className="text-lg text-gray-400 font-semibold mb-2">
            {first_name}
          </h2>
          <h2 className="text-lg text-gray-500 font-semibold mb-2">
            {last_name}
          </h2>

          <div className="flex items-center">
            <div className="mr-2">
              {Array.from({ length: rating }, (_, i) => (
                <span key={i} className="text-yellow-700">
                  &#9733;
                </span>
              ))}
            </div>
            <span className="text-sm">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
