import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPlans from "../components/CardPlans";
import logo from "@/assets/images/logoDePlan.png";
import Image from "next/image";
import { getCookie, setCookie } from "@/utils/cookieHandler";
//mostrar los planes para los trainers
type PlansType = {
  id: number;
  name: string;
  cost: number;
  category: string;
  description: string;
};

export default function plans() {
  const [plans, setPlans] = useState<PlansType[]>([]);
  console.log(plans)
  const [promocion1, setPromocion1] = useState(
    "With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );
  const [promocion2, setPromocion2] = useState(
    "offer via Paypal With your online subscription through Paypal, YOU SAVE MORE THAN 20% of tuition"
  );



  

  useEffect(() => {
    axios('http://localhost:3001/plans/trainers?page=1')
      .then(({ data }) => setPlans(data))
      .catch((error) => console.log(error));
        //user token
 
    const key=getCookie('token')
    console.log(key);
    axios.post("http://localhost:3001/user/perfil",null,{headers:{'x-access-token': key}})
    .then((data) => {
      if(data.data.role==='trainer')console.log(data.data.role);
      if(data.data.role=== 'trainee')console.log(data.data.role);
    })


  }, []);
  // plans
  console.log(plans);
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

      {promocion2 && (
        <div className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-gray-800 h-40">
          <h2 className="pt-10 text-3xl text-white ">{promocion2}</h2>
          <p className="text-xl  text-white  ">¡ bla bla bla ---!</p>
        </div>
      )}

      <div className=" caja-plan   ">
        {plans.map((e) => (
          <CardPlans
            key={e.id}
            idPlans={e.id}
            name={e.name}
            cost={e.cost}
            category={e.category}
            description={e.description}
          />
        ))}
      </div>
    </div>
  );
}
