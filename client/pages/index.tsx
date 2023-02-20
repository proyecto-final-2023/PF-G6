// Libraries
// Types
// Components/Assets
import landindSlides from "@/assets/landing-slides";
import SwiperCarousel from "@/components/SwiperCarousel";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function LandingPage() {
  return (
    <div>
      <div className="min-h-[100vh] bg-[url('/tail-imgs/img_landing1.png')]">
        <div className="bg-opacity-50 bg-black flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-lg font-semibold max-w-[23ch]">
            YOUR TRAINER & YOUR NUTRITIONAL PLAN IN THE SAME PLACE
          </h1>
        </div>
      </div>
      <SwiperCarousel slidesArr={landindSlides} />
    </div>
  );
}
