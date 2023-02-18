import { TripleImageCarouselProps } from "@/types/components";
import Image from "next/image";

export default function TripleImagesCarrousel(props: TripleImageCarouselProps) {
  const { prevImg, currImg, nextImg } = props;

  return (
    <div className="flex gap-3">
      <div className="hover:text-white">
        <Image
          src={prevImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60 object-cover"
        />
      </div>
      <h1 className="text-white">{prevImg.hoverText}</h1>
      <div>
        <Image
          src={currImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60 object-cover"
        />
      </div>
      <div>
        <Image
          src={nextImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60 object-cover"
        />
      </div>
    </div>
  );
}
