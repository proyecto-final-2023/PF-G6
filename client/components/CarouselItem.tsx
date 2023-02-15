import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image, { StaticImageData } from "next/image";
import CarouselIndicator from "./CarouselIndicator";

interface CarouselItemProps {
  imgData: { title: string; image: StaticImageData };
  isModalOpen: boolean;
  imgClickHandler?: () => void;
  indicators: { current: number; total: number };
}

export default function CarouselItem(props: CarouselItemProps) {
  const { imgData, imgClickHandler, indicators } = props;

  return (
    <div>
      <div onClick={imgClickHandler}>
        <Image src={imgData.image} alt="" height={330} className="rounded-md" />
        {/* title: {imgData.title} */}
      </div>

      <CarouselIndicator
        current={indicators.current}
        total={indicators.total}
      />
    </div>
  );
}
