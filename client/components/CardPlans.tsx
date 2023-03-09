import React from "react";
import { CardPlansProps } from "@/types/components";
import PaypalButton from "./PaypalButton";

export default function CardPlans(props: CardPlansProps) {
  const { name, cost, category, description, idPlans } = props;
  //card de lo planes
  const className = "bg-slate-900/90 text-center p-4 text-lg";

  return (
    <div className="flex pt-10 px-5">
      <div>
        <div className={className}>{name}</div>
        <p className={className}>{cost}USD</p>
        <p className={className}>{category}</p>
        <p className={className}>{description}</p>
        <div className="mb-10  h-10 flex justify-center items-center mt-10">
          <PaypalButton
            amountToPay={cost}
            serviceName={name}
            idPlans={idPlans}
            idUser={2}
          />
        </div>
      </div>
    </div>
  );
}
