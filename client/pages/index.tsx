import CarouselIndicator from "@/components/CarouselIndicator";
import CarouselItem from "@/components/CarouselItem";
import React, { useState} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import landindSlides from "../assets/landing-slides";

//! THIS IS LANDING

// ? Loops over them instead of stop working when we reach the end
export default function index() {
  const [slideNum, setSlideNum] = useState(0);

  const nextImgHandler = () => {
    const willBeGreater = slideNum + 1 >= landindSlides.length;
    const newIndex = willBeGreater ? 0 : slideNum + 1;
    setSlideNum(newIndex);
  };

  const prevImgHandler = () => {
    const willBeLower = slideNum - 1 < 0;
    const newIndex = willBeLower ? landindSlides.length - 1 : slideNum - 1;
    setSlideNum(newIndex);
  };

  return (
    <div className="galleryWrap">
      <button className="" onClick={nextImgHandler}>
        <FaArrowLeft />
      </button>

      <CarouselItem isModalOpen={true} imgData={landindSlides[slideNum]} />
      <CarouselIndicator current={0} total={10} />

      <button className="" onClick={prevImgHandler}>
        <FaArrowRight />
      </button>
    </div>
  );
}

