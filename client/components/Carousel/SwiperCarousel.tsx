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
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {slidesArr.map((slide) => (
          <SwiperSlide
            key={slide.hoverText}
            className="text-transparent hover:text-white relative"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="rounded-md w-auto h-[450px] object-cover hover:opacity-20 transition duration-300 ease-in-out hover:scale-105"
            />
            <p className="absolute top-1/2 left-1/3 uppercase -z-10 font-bold">
              {slide.title}
            </p>
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

  {
    /* <div class="bg-gray-300 p-4 hover:bg-gray-400">
  <h2 class="text-gray-800 opacity-0 hover:opacity-100 transition duration-500">Text on hover</h2>
</div> */
  }
}
{
  /* <Image
  src={slide.image}
  alt={`some cool thing`}
  height={330}
  className="rounded-md object-cover hover:opacity-20 transition duration-300 ease-in-out hover:scale-105"
/>
<h1 className="-mt-40 text-center">{slide.hoverText}</h1> */
}
