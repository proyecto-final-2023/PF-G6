import React from "react";
import { CardPlansProps } from "@/types/components";
import PaypalButton from "./PaypalButton";

export default function CardPlans(props: CardPlansProps) {
  const { name, cost, category, description,idPlans } = props;
 //card de lo planes 
  return (
    <div className="  m-50 py-10 ">
      <div className=" bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 rounded-t-lg text-center font-bold text-xl text-white   w-50   ">
        {name}
      </div>
      <p className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-centerw-40 text-center text-white  text-4xl">
        {cost}USD
      </p>
      <p className="bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-white  w-50 ">
        {category}
      </p>
      <p className="  bg-gradient-to-r from-yellow-200 via-orange-400 to-rose-500 text-center text-white    h-40 text-3x1 ">
        {description}
      </p>
      <div className=" mb-10  h-10">
        <PaypalButton  amountToPay={cost} serviceName={name} idPlans={idPlans} idUser={2} />
      </div>
      {/* <div className=""><Paypal cost={cost} />  </div> */}
    </div>
  );
}

  // first_name: 'Hanaé',
  // last_name: 'Michel',
  // nickname: 'lazydog695',
  // role: 'trainer',
  // imgURL: 'https://randomuser.me/api/portraits/women/84.jpg',
  // logueo: { email: 'hanae.michel@example.com' },
  // membership: {
  //   trainerIdTrainer: '37e22d84-9c1f-4495-a304-58aa63789ea8',
  //   traineeIdTrainee: null,
  //   trainer: {
  //     logo: null,
  //     planTrainees: Array(2) [
  //       {
  //         id_PlanTrainee: 'd635a8f2-843f-4f1e-bdb0-320765357ba8',
  //         name: 'full',
  //         cost: '23',
  //         description: ' full top',
  //         category: 'trainee',
  //         trainerIdTrainer: '37e22d84-9c1f-4495-a304-58aa63789ea8'
  //       },

  // [
  //   {
  //     id_PlanTrainee: 'd635a8f2-843f-4f1e-bdb0-320765357ba8',
  //     name: 'full',
  //     cost: '23',
  //     description: ' full top',
  //     category: 'trainee',
  //     trainerIdTrainer: '37e22d84-9c1f-4495-a304-58aa63789ea8'
  //   }, {
  //     id_PlanTrainee: '7a522f3c-1100-42d8-95cb-e470d583c572',
  //     name: 'cool',
  //     cost: '2',
  //     description: ' full top',
  //     category: 'trainee',
  //     trainerIdTrainer: '37e22d84-9c1f-4495-a304-58aa63789ea8'
  //   },
    
  // ]