import CarouselItem from "@/components/CarouselItem";
import React, { useState } from "react";
import landindSlides from "../assets/landing-slides.json";
//! THIS IS LANDING

export default function index() {
  // TODO: open and close modal
  const [slideNum, setSlideNum] = useState(0);
  // const [modalOpen, setModalOpen] = useState(false);

  // const handleOpenModal = (index: number) => {
  //   setSlideNum(index);
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  const changeImgHandler = (direction: "next" | "prev") => {
    let newIndex: number;

    if (direction === "next") {
      const willBeGreater = slideNum + 1 >= landindSlides.length;
      newIndex = willBeGreater ? 0 : slideNum + 1;
    }
    //
    else {
      const willBeLower = slideNum - 1 < 0;
      newIndex = willBeLower ? landindSlides.length - 1 : slideNum - 1;
    }

    setSlideNum(newIndex);
  };

  return (
    <div className="galleryWrap">
      {/* className="single" */}
      <CarouselItem
        imgData={landindSlides[slideNum]}
        isModalOpen={true}
        {...{ changeImgHandler }}
      />
      {/* <br />
    Current slide number:  {slideNumber}
    <br />
    Total Slides: {landindSlides.length}
    <br /><br /> */}
    </div>
  );
}
