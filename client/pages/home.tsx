import CarouselComp from "@/components/carousel/CarouselComp";
import homeSlides from "@/assets/home-slides";

export default function Home() {
  return (
    <div>
      <CarouselComp slidesArr={homeSlides} />
    </div>
  );
}


