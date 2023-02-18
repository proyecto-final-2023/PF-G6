import CarouselComp from "@/components/Carousel/CarouselComp";
import landindSlides from "@/assets/landing-slides";

export default function LandingPage() {
  return (
    <div>
      <div className="divImg1">
        <h1 className="textoImg1">
          YOUR TRAINER & YOUR NUTRITIONAL PLAN IN THE SAME PLACE
        </h1>
      </div>
      <CarouselComp slidesArr={landindSlides} />
      <div className="divImg2">
        <h1 className="textoImg1">
          ARE YOU TRAINER? JOIN TO THE BEST NETWORK WITH THE BEST TOOLS FOR THE
          DIGITAL ERA
        </h1>
      </div>
      <CarouselComp slidesArr={landindSlides} />
    </div>
  );
}
