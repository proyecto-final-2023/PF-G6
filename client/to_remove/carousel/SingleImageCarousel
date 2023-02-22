import { SingleImageCarouselProps } from "@/types/components";
import Image from "next/image";
import CarouselIndicator from "./CarouselIndicator";

export default function SingleImageCarousel(props: SingleImageCarouselProps) {
  const { indicators, currImg } = props;

  return (
    <div>
      <div>
       <Image
          src={currImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-80 h-80"/>
      </div>

      <CarouselIndicator
        current={indicators.current}
        total={indicators.total}
      />
    </div>
  );
}
