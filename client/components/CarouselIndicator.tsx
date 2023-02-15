import React from "react";
import { BsCircle, BsCircleFill } from "react-icons/bs";

interface CarouselIndicatorProps {
  current: number;
  total: number;
}

export default function CarouselIndicator(props: CarouselIndicatorProps) {
  const anz = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return <div>CarouselIndicator</div>;
}

// export async function getStaticProps() {
//   return {
//     props: {
//       test: process.env.COOL_IT,
//     },
//   };
// }
