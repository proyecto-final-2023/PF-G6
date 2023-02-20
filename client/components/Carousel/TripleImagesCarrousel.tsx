import { TripleImageCarouselProps } from "@/types/components";
import Image from "next/image";

export default function TripleImagesCarrousel(props: TripleImageCarouselProps) {
  const { prevImg, currImg, nextImg } = props;

  return (
    <div className="flex gap-3">
      <div className="text-transparent hover:text-white">
        <Image
          src={prevImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60  hover:opacity-20 transition duration-300 ease-in-out hover:scale-105 "
        />
        
        <h1 className=" -m-40 text-center w-auto">{prevImg.hoverText}</h1>
        
      </div>
      <div className="text-transparent hover:text-white">
        <Image
          src={currImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60 object-cover hover:opacity-20 transition duration-300 ease-in-out hover:scale-105"
        />
         <h1 className="-mt-40 text-center">{currImg.hoverText}</h1>
      </div>
      <div className="text-transparent hover:text-white">
        <Image
          src={nextImg.image}
          alt={`some cool thing`}
          height={330}
          className="rounded-md w-auto h-60 object-cover hover:opacity-20 transition duration-300 ease-in-out hover:scale-105"
        />
         <h1 className="-mt-40 text-center">{nextImg.hoverText}</h1>
      </div>
    </div>
    
    
  );
}
