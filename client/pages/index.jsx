import CarouselComp from "@/components/Carousel/CarouselComp";
import landindSlides from "@/assets/landing-slides";
import landindSlides2 from "@/assets/landing-slides2";
import Link from "next/dist/client/link";

export default function LandingPage() {
  return (
    <div className="text-white">
      {/* <div className="divImg1"> */}
      <div className="flex flex-col justify-center items-center bg-[url('/bgs/img_landing1.png')] h-[95vh] bg-no-repeat bg-top bg-cover">
        <h1 className="text-center text-xl font-bold">
          YOUR TRAINER & YOUR NUTRITIONAL PLAN IN THE SAME PLACE
        </h1>
        <Link href="login">
          <button className="text-white w-max bg-gray-800 text-center hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Find a Trainer for you!
          </button>
        </Link>
      </div>
      <CarouselComp slidesArr={landindSlides} />
      {/* <div className="divImg2"> */}
      <div className="h-[95vh] flex flex-col justify-center items-center bg-[url('/bgs/img_landing2.png')] bg-no-repeat bg-cover bg-top mt-5">
        <h1 className="textoImg1">
          ARE YOU TRAINER? <br></br>JOIN TO THE BEST NETWORK WITH THE BEST TOOLS
          FOR THE DIGITAL ERA
        </h1>
        <Link href="login">
          <button className="w-max bg-gray-800 text-center hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Find the Best Plan For You!
          </button>
        </Link>
      </div>
      <CarouselComp slidesArr={landindSlides2} />
    </div>
  );
}
