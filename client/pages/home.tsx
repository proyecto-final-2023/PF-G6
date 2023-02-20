import Image from "next/image";
// Libraries
// Types
// Components/Assets
import homeSlides from "@/assets/home-slides";
import logoImg from "@/assets/images/placeholder-logo.png";
import SwiperCarousel from "@/components/SwiperCarousel";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Home() {
  return (
    <>
      <div className="bg-[url('/tail-imgs/gym-bg.jpg')]  bg-no-repeat  bg-cover bg-bottom bg-fixed  backdrop-blur-sm  ">
        <div className="bg-[rgba(23,23,23,0.7)] opacity-90  ">
          <h1 className=" text-center font-bold py-20  text-yellow-700 opacity-70  ">
            WELCOME TO
          </h1>
          <div className="w-2/3 mx-auto py-12 flex justify-center align-items:center gap-5 m-4.">
            <Image
              src={logoImg}
              width={400}
              alt={`link of the whole app`}
              className="transition ease-in-out delay-550  hover:-translate-y-1 hover:scale-110 hover: duration-100 drop-shadow-2xl  "
            />
          </div>
          <p className="text-center  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cumque eligendi illum iusto. ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
        </div>
      </div>
      <div className="text-center py-20 ">
        <h2 className="text-center font-bold text-yellow-700  ">
          We have exercises like
        </h2>
        <SwiperCarousel slidesArr={homeSlides} />
      </div>
    </>
  );
}
