import { FaBeer } from "react-icons/fa";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPlans from "../components/CardPlans";
import logo from "@/assets/images/placeholder-logo.png";
import Image from "next/image";

export default function plans() {
  const [plans, setPlans] = useState([]);
  const [promocion1, setPromocion1] = useState( "Con tu suscripción online a través de Paypal,  AHORRÁS MÁS DE $--- de la matrícula " );
  const [promocion2, setPromocion2] = useState("Promo a través de Paypal");

  useEffect(() => {
    axios("http://localhost:3001/plans")
      .then(({ data }) => setPlans(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(plans);
  return (
    <div>
      <header className="plan">
        <div className="w-2/3 mx-auto py-12 flex justify-center align-items:center gap-5 m-4.">
          <Image
            src={logo}
            width={400}
            alt={`link of the whole app`}
            className="transition ease-in-out delay-550 opacity-50  hover:-translate-y-1 hover:scale-110 hover: duration-100 drop-shadow-2xl justify-items-center    "
          />
          <h1 className="bg-clip-text text-transparent  bg-yellow-900 text-4x1">
            Plans
          </h1>
        </div>
      </header>

      <div className="bg-gray-800 text-center h-80 ">
        <h2 className="pt-28  text-yellow-900 text-4xl">
          ELEGÍ TU PLAN Y EMPEZÁ A ENTRENAR
        </h2>
        <p className="text-2xl">{promocion1}</p>
        <p className="text-2xl">¡Adquirí tu plan ahora!</p>
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
