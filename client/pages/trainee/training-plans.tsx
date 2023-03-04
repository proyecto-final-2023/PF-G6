import CardPlans from "@/components/CardPlans";
import axios from "axios";
import React, { useEffect, useState } from "react";
//aqui tiene pra ver  los planes para trainee
export default function TrainingPlans() {
  //prueba
  const plansTrainee=[{
      id_PlanTrainee: "9885f13a-4f07-40d4-82c0-729dbd32c3cb",
      name: "Bronce para Peso345",
      cost: 5,
      description: "Aqui la descripcion",
      category: "trainee",
      trainerIdTrainer: "3ecd5a1a-f6bc-49f4-99ab-971003de134a"
  }]

  useEffect(() => {
    axios("https://fp-server-cg2b.onrender.com/plans/trainee")
      .then(({ data }) => console.log(data))
      .catch((error) => console.log(error));
  }, []);
  
  return(
    <div className=" flex justify-items-center content-center mt-10 ">
      <div className=" mt-10">
        <h1>Plans-Trainee</h1>
      </div>
        {/* {plansTrainee.map((e) => (
          < CardPlans
            key={e.id_PlanTrainee}
           
            name={e.name}
            cost={e.cost}
            category={e.category}
            description={e.description}
          />
        ))} */}
      </div>
  )
   
   

}
