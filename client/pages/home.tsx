import Image from "next/image";
import homeSlides from "@/assets/home-slides";
import logoImg from "@/assets/images/placeholder-logo.png";
import Link from "next/link";

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
          Find the Best Trainer For You!
        </h2>
        <Link href="/plans">
          <div className=" bg-gray-800 max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="text-yellow-800 font-bold text-xl mb-2">
                Plans{" "}
              </div>
              <p className="text-white text-base">PLANS TRAINEE</p>
            </div>
          </div>
        </Link>

        {/* <CarouselComp slidesArr={homeSlides} /> */}
      </div>
    </>
  );
}
