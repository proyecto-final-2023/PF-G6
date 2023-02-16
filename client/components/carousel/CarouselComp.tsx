import { useState } from "react";
import { StaticImageData } from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CarouselItem from "@/components/carousel/CarouselItem";

// ? Loops over them instead of stop working when we reach the end
interface CarouselCompProps {
  slidesArr: Array<{ title: string; image: StaticImageData }>;
}

export default function CarouselComp(props: CarouselCompProps) {
  const { slidesArr } = props;
  const [slideNum, setSlideNum] = useState(0);

  const nextImgHandler = () => {
    const willBeGreater = slideNum + 1 >= slidesArr.length;
    const newIndex = willBeGreater ? 0 : slideNum + 1;
    setSlideNum(newIndex);
  };

  const prevImgHandler = () => {
    const willBeLower = slideNum - 1 < 0;
    const newIndex = willBeLower ? slidesArr.length - 1 : slideNum - 1;
    setSlideNum(newIndex);
  };

  return (
    <div className="flex justify-center align-middle gap-3 m-3">
      <button className="" onClick={prevImgHandler}>
        <FaArrowLeft />
      </button>

      <CarouselItem
        isModalOpen={true}
        imgData={slidesArr[slideNum]}
        indicators={{ current: slideNum + 1, total: slidesArr.length }}
      />

      <button className="" onClick={nextImgHandler}>
        <FaArrowRight />
      </button>
    </div>
  );
}
