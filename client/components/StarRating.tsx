import React, { useState, useEffect } from "react";
import Stars from "react-stars";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";

interface RatingComponentProps {}
interface tRating {
  actualRating?: number;
  traineeRating?: number;
}

const RatingComponent: React.FC<RatingComponentProps> = () => {
  const [rating, setRating] = useState<tRating>();
  const key = getCookie("token");

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainees/rating`, {
      headers: {
        "x-access-token": key,
      }
    }).then(data => setRating({actualRating:data.data.rating.rating, traineeRating: data.data.value} ));
    console.log('use-efect')
  },[])



  const handleRatingChange = async (newRating: number) => {
    setRating({...rating,traineeRating: newRating });

    try {
      const response = await axios.put<{ value: number }>(
        `${process.env.NEXT_PUBLIC_API_URL}/trainees/rating`,
        { value: newRating },
        {
          headers: { "x-access-token": key }
        }
      );
      //console.log("Rating sent: ", response.data);
    } catch (error) {
      console.error("Error sending rating: ", error);
    }
  };

  return (
    <div>
      <p>Rating: {rating?.actualRating}</p>
      <Stars count={5} size={30} onChange={handleRatingChange} value={rating?.traineeRating} />
    </div>
  );
};

export default RatingComponent;
