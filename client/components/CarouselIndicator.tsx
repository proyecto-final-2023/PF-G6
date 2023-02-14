import React from "react";
import { BsCircle, BsCircleFill } from "react-icons/bs";

interface CarouselIndicatorProps {
  current: number;
  total: number;
}

export default function CarouselIndicator(props: CarouselIndicatorProps) {
  const { current, total } = props;
  const { COOL_IT } = process.env;
  console.log(COOL_IT);

  return <div>CarouselIndicator</div>;
}
