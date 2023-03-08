import React from "react";
import ReactStars from "react-stars";

export default function Rating() {
  return (
    <div className="flex justify-center">
      <p className="text-2xl self-center mr-1">Rate me: </p>
      <ReactStars count={5}  size={35} color2={"#ffd700"} />
    </div>
  );
}