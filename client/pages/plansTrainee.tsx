import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPlans from "../components/CardPlans";
import logo from "@/assets/images/logoDePlan.png";
import Image from "next/image";
import CardTrainers from "@/components/CardTrainers";

//mostrar los planes para los trainers
type PlansType = {
  id: number;
  name: string;
  description: string;
};



export default function plansTrainee() {
  const [plans, setPlans] = useState<PlansType[]>([]);
  console.log(plans)
  const [promocion1, setPromocion1] = useState(
    "With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );
  const [promocion2, setPromocion2] = useState(
    "offer via Paypal With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );

  useEffect(() => {
    axios('http://localhost:3001/trainers?page=1')
      .then((data) => {
      console.log(data.data)
    
     setPlans(data.data.map(e=>e.membership))
      }
      )
      .catch((error) => console.log(error));
  }, []);
  // plans
//   console.log(plans.map(e=>e.membership));
  return (
    <div>
      <header className="plan">
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

      
      <div className="bg-black  ">
        <h1 className="text-center" >top new </h1>
        <div className="grid grid-rows-3 grid-flow-col gap-4">
      </div>
      
          <div className=" grid grid-cols-6 gap-5">
        {
            plans&&plans.map(e=>
                <CardTrainers 
                 photo={e.user.imgURL}
                 first_name={e.user.first_name}
                 last_name={e.user.last_name}
                 id={e.userId}
                 rating={5} />
            )
        }
      </div>
      <div className="bg-black  ">
        <h1 className="text-center"  >top 10 </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        {
            plans&&plans.map(e=>
              <CardTrainers 
              photo={e.user.imgURL}
              first_name={e.user.first_name}
              last_name={e.user.last_name}
              id={e.userId}
              rating={5} />
            )
        }
      </div>
      {promocion2 && (
        <div className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-gray-800 h-40">
          <h2 className="pt-10 text-3xl text-white ">{promocion2}</h2>
          <p className="text-xl  text-white  ">¡ bla bla bla ---!</p>
        </div>
      )}
      <div className=" grid grid-rows-4 grid-flow-col gap-4  ">
        {
            plans&&plans.map(e=>
              <CardTrainers 
                 photo={e.user.imgURL}
                 first_name={e.user.first_name}
                 last_name={e.user.last_name}
                 id={e.userId}
                 rating={5} />
            )
        }
      </div>
    </div>
    </div>
  );
}