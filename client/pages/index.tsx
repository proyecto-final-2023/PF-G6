// Libraries
import Link from "next/dist/client/link";
// Types
// Components/Assets
import landindSlides from "@/assets/landing-slides";
import SwiperCarousel from "@/components/SwiperCarousel";
import landindSlides2 from "@/assets/landing-slides2";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// export default function LandingPage() {
//   return (
//     <div>
//       <div className="min-h-[100vh] bg-[url('/tail-imgs/img_landing1.png')]">
//         <div className="bg-opacity-50 bg-black flex justify-center items-center h-[100vh]">
//           <h1 className="text-center text-lg font-semibold max-w-[23ch]">
//             YOUR TRAINER & YOUR NUTRITIONAL PLAN IN THE SAME PLACE
//           </h1>
//         </div>
//       </div>
//       <SwiperCarousel slidesArr={landindSlides} />
//     </div>
//   );
// }

export default function LandingPage() {
  return (
    <div>
      <div className="divImg1">
        <h1 className="textoImg1">
          YOUR TRAINER & YOUR NUTRITIONAL PLAN IN THE SAME PLACE
        </h1>
        <Link href="login">
          {" "}
          <button className="text-white w-max bg-gray-800 text-center hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Find a Trainer for you!
          </button>{" "}
        </Link>
      </div>
      <SwiperCarousel slidesArr={landindSlides} />
      <div className="divImg2">
        <h1 className="textoImg1">
          ARE YOU TRAINER? <br></br>JOIN TO THE BEST NETWORK WITH THE BEST TOOLS
          FOR THE DIGITAL ERA
        </h1>
        <Link href="login">
          {" "}
          <button className="text-white w-max bg-gray-800 text-center hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Find the Best Plan For You!
          </button>{" "}
        </Link>
      </div>
      <SwiperCarousel slidesArr={landindSlides2} />
    </div>
  );
}
