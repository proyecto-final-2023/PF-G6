// Libraries
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
// Types
import { SwiperCarouselProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function SwiperCarousel({ slidesArr }: SwiperCarouselProps) {
  return (
    <div className="w-[80vw] mx-[10vw] my-12">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {slidesArr.map((slide) => (
          <SwiperSlide key={slide.hoverText}>
            <Image
              src={slide.image}
              alt={slide.title}
              className="rounded object-cover h-[300px]"
            />
            <p>{slide.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
