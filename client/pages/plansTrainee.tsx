import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logoDePlan.png";
import Image from "next/image";
import CardTrainers from "@/components/CardTrainers";
import SwiperCarousel from "@/components/Carousel/SwiperCarousel";
import homeSlides from "@/assets/home-slides";
import WithPrivateRouter from "@/components/WithPrivateRoute";
/*  photo={e.user.imgURL || user?.photoURL}
    first_name={e.user.first_name}
    last_name={e.user.last_name}
    id={e.userId}
    rating={5} */

interface Trainer {
  id_trainer: string;
  logo: string;
  membership: {
    userId: string;
    user: {
      first_name: string;
      last_name: string;
      imgURL: string;
    };
  };
  planTrainees: {
    id_PlanTrainee: string;
    name: string;
    cost: string;
    description: string;
    category: string;
    trainerIdTrainer: string;
  }[];
}

type PlansType = {
  userId: string;
  user: {
    name: string;
    photo: string;
    first_name: string;
    last_name: string;
    imgURL: string;
  };
};

 function plansTrainee() {
  const [plans, setPlans] = useState<PlansType[]>([]);
  const [promocion1, setPromocion1] = useState(
    "With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );
  const [promocion2, setPromocion2] = useState(
    "offer via Paypal With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/trainers?page=1`)
      .then((data) => setPlans(data.data))
      .catch((error) => console.error(error));
    console.warn(plans);
  }, []);


  // plans
  return (
    <div>
      <header className="plan ">
        <div className="w-2/3 mx-auto py-12 flex justify-center align-items:center gap-5 m-4.">
          <Image
            src={logo}
            width={400}
            alt={`link of the whole app`}
            className="transition ease-in-out delay-550 opacity-60  hover:-translate-y-1 hover:scale-110 hover: duration-100 drop-shadow-2xl justify-items-center    "
          />
          <h1 className="bg-clip-text text-transparent  bg-yellow-900 text-4x1">
            Plans
          </h1>
        </div>
      </header>

      <div className="bg-gray-800 text-center h-80 ">
        <h2 className="pt-28  text-yellow-900 text-4xl">
          CHOOSE YOUR PLAN AND START TRAINING
        </h2>
        <p className="text-2xl">{promocion1}</p>
        <p className="text-2xl">¡I bought your plan now!</p>
      </div>

      <div className=" bg-[url('/tail-imgs/1zLe.gif')] bg-no-repeat bg-cover bg-bottom ">
        <h1 className="text-center text-5xl">Top</h1>
      </div>

      <div className="   outline-offset-3 justify-items-center  grid grid-cols-4  m-20 gap-x-2 gap-y-2">
        {plans &&
          plans.map((e: any) => (
            <CardTrainers
              photo={e.logo}
              first_name={e?.membership?.user?.first_name}
              last_name={e?.membership?.user?.last_name}
              id={e?.membership?.userId}
              rating={5}
            />
          ))}
      </div>
      <div className="bg-black  ">
        <h1 className="text-center text-3xl">Top 10</h1>
      </div>
      <SwiperCarousel slidesArr={homeSlides} />
      <div className=" justify-items-center grid grid-cols-4  m-20 gap-x-2 gap-y-2">
        {plans &&
          plans.map((e: any) => (
            <CardTrainers
            photo={e.logo}
            first_name={e?.membership?.user?.first_name}
            last_name={e?.membership?.user?.last_name}
            id={e?.membership?.userId}
            rating={5}
            />
          ))}
      </div>
      {promocion2 && (
        <div className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-gray-800 h-40">
          <h2 className="pt-10 text-3xl text-white ">{promocion2}</h2>
          <p className="text-xl  text-white  ">¡ bla bla bla ---!</p>
        </div>
      )}
      <div className=" justify-items-center  grid grid-cols-4  m-20 gap-x-2 gap-y-2 ">
        {plans &&
          plans.map((e: any) => (
            <CardTrainers
            photo={e.logo}
              first_name={e?.membership?.user?.first_name}
              last_name={e?.membership?.user?.last_name}
              id={e?.membership?.userId}
              rating={5}
            />
          ))}
      </div>
    </div>
  );
}

export default WithPrivateRouter(plansTrainee)