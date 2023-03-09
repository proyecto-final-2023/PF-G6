import Image from "next/image";
import homeSlides from "@/assets/home-slides";
import logoImg from "@/assets/images/placeholder-logo.png";
import SwiperCarousel from "@/components/Carousel/SwiperCarousel";
import Link from "next/link";
import WithPrivateRouter from "@/components/WithPrivateRoute";

function Home() {
  return (
    <>
      <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed  backdrop-blur-sm">
        <div className="bg-[rgba(23,23,23,0.7)] opacity-90 flex justify-center items-center flex-col gap-10">
          <h1 className="text-center font-bold text-yellow-700 opacity-70 sm:text-red-200">
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
          <p className="text-center pb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cumque eligendi illum iusto. ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
        </div>
      </div>
      <div className="text-center py-20 ">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Find the Best Plans For You!
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          Here at Fit-U we focus on tools where value and drive growth.
        </p>

        <div className="  flex flex-row gap-20  m-10 h-60 justify-center align-items:center">
          <Link replace href="/plans">
            <div className=" bg-black h-60 rounded-lg animate-pulse   shadow-yellow-900/50 bg-[url('/tail-imgs/1zLe.gif')] bg-no-repeat bg-cover bg-bottom   max-w-sm overflow-hidden shadow-lg">
              <div className="px-6 py-4 ">
                <h1 className="flex items-center text-5xl font-extrabold text-white">
                  Trainer
                  <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">
                    Plans
                  </span>
                </h1>
              </div>
            </div>
          </Link>
          <Link replace href="/plansTrainee">
            <div className=" bg-gray-800 max-w-sm h-60 rounded-lg animate-pulse  shadow-yellow-900/50  bg-[url('/tail-imgs/1zLe.gif')] bg-no-repeat bg-cover bg-bottom  overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <h1 className="flex items-center text-5xl font-extrabold :text-white">
                  Trainee
                  <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">
                    Plans
                  </span>
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom  h-[100vh]">
        <SwiperCarousel slidesArr={homeSlides} />
        </div>
       
      </div>
    </>
  );
}

export default WithPrivateRouter(Home);
