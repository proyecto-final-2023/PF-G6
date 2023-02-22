// Libraries
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
// Types
import { SwiperCarouselProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function SwiperCarousel({ slidesArr }: SwiperCarouselProps) {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    function updateViewportWidth() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateViewportWidth);

    updateViewportWidth();
    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  return (
    <div className="w-[80vw] mx-auto my-10">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={viewportWidth > 700 ? 3 : 1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {slidesArr.map((slide) => (
          <SwiperSlide key={slide.hoverText}>
            <Image
              src={slide.image}
              alt={slide.title}
              className="rounded-md w-auto h-[450px] object-cover hover:opacity-20 transition duration-300 ease-in-out hover:scale-105"
            />
            <div className="flex flex-col justify-between items-center absolute top-1/3 gap-7 -z-10">
              <p className="uppercase font-bold text-center p-3">
                {slide.hoverText}
              </p>
              <p className="uppercase font-bold text-center p-3">
                {slide.hoverText2}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <BsArrowLeftCircleFill
          className="swiper-button-prev rounded-full fill-orange-500"
          size={32}
        />
        <BsArrowRightCircleFill
          className="swiper-button-next rounded-full fill-orange-500"
          size={32}
        />
      </Swiper>
    </div>
  );
}
