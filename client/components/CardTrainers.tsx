import React from 'react'

// card trainers
const Card = ({ photo, first_name,last_name, description, rating }) => {
    return (
      <div className="card bg-white rounded-lg overflow-hidden shadow-lg">
        <img src={photo} alt={name} className="card__photo" />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{first_name}</h2>
          <h2 className="text-lg font-semibold mb-2">{last_name}</h2>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <div className="flex items-center">
            <div className="mr-2">
              {Array.from({ length: rating }, (_, i) => (
                <span key={i} className="text-yellow-400">&#9733;</span>
              ))}
            </div>
            <span className="text-sm">{rating}</span>
          </div>
        </div>
      </div>
    );
  };
  

  
  export default Card;