import Image from "next/image";
import { CarouselItemProps } from "@/types/components";
import CarouselIndicator from "./CarouselIndicator";

export default function CarouselItem(props: CarouselItemProps) {
  const { imgData, imgClickHandler, indicators } = props;

  return (
    <div>
      <div onClick={imgClickHandler}>
        <Image src={imgData.image} alt="" height={330} className="rounded-md w-80 h-80" />
      </div>

      <CarouselIndicator
        current={indicators.current}
        total={indicators.total}
      />
    </div>
  );
}
