import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image, { StaticImageData } from "next/image";

interface CarouselItemProps {
  imgData: { title: string; image: StaticImageData };
  isModalOpen: boolean;
  imgClickHandler?: () => void;
}

export default function CarouselItem(props: CarouselItemProps) {
  const { imgData, imgClickHandler } = props;

  return (
    <div>
      <div className="sliderWrap">
        {/* <button className="" onClick={}>
            <AiOutlineCloseCircle />
          </button> */}
        <div className="" onClick={imgClickHandler}>
          <Image src={imgData.image} alt="" height={330} />
          title: {imgData.title}
        </div>
      </div>
    </div>
  );
}
