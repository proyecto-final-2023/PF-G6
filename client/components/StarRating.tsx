import React, { useState } from "react";
import Stars from "react-stars";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";

interface RatingComponentProps {}

const RatingComponent: React.FC<RatingComponentProps> = () => {
  const [rating, setRating] = useState<number>(0);
  const key = getCookie("token");

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);

    try {
      const response = await axios.put<{ value: number }>(
        `${process.env.NEXT_PUBLIC_API_URL}/trainees/rating`,
        { value: newRating },
        {
          headers: { "x-access-token": key }
        }
      );
      console.log("Rating sent: ", response.data);
    } catch (error) {
      console.error("Error sending rating: ", error);
    }
  };

  return (
    <div>
      <p>Rating: {rating}</p>
      <Stars count={5} size={30} onChange={handleRatingChange} />
    </div>
  );
};

export default RatingComponent;
