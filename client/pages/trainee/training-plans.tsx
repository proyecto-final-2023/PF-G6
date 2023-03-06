import CardPlans from "@/components/CardPlans";
import axios from "axios";
import React, { useEffect, useState } from "react";
//aqui tiene pra ver  los planes para trainee
export default function TrainingPlans() {



  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/plans/trainee`)
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
