import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";

interface CarouselItemProps {
  imgData: { title: string; image: string };
  isModalOpen: boolean;
  changeImgHandler: (direction: "next" | "prev") => void;
}

export default function CarouselItem(props: CarouselItemProps) {
  const { imgData, changeImgHandler } = props;
  const imgPath = ``;

  const showNextImg = () => {
    changeImgHandler("next");
  };

  const showPrevImg = () => {
    changeImgHandler("prev");
  };

  const imgClickHandler = () => {};

  // <div className="fullScreenImage">
  //   <img src={galleryImages[slideNumber].img} alt="" />
  // </div>
  return (
    <div>
      <div className="sliderWrap">
        {/* <button className="" onClick={}>
            <AiOutlineCloseCircle />
          </button> */}
        <button className="" onClick={showPrevImg}>
          <FaArrowLeft />
        </button>

        <button className="" onClick={showNextImg}>
          <FaArrowRight />
        </button>

        <div className="" onClick={imgClickHandler}>
          <Image
            src={imgData.image}
            alt="missing carr img"
            width={130}
            height={130}
          />
        </div>
      </div>
    </div>
  );
}
/* <FontAwesomeIcon
    icon={faCircleXmark}
    className="btnClose"
    onClick={handleCloseModal}
  />
  <FontAwesomeIcon
    icon={faCircleChevronLeft}
    className="btnPrev"
    onClick={prevSlide}
  />
  <FontAwesomeIcon
    icon={faCircleChevronRight}
    className="btnNext"
    onClick={nextSlide}
  /> */
