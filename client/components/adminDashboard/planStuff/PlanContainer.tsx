// import { Plan, PlanDetails } from "@/types/components/dashboard";
import { useState } from "react";
import PlanCard from "./PlanCard";
import PlanDetails from "./PlanDetails";

export type PlanContainerProps = {
  // basicData: Plan[];
  // fullData: PlanDetails[];
  // currentPage: number;
};
const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function PlanContainer() {
  return (
    <div>
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {someArray.map((item) => (
          <button
            className="bg-slate-700 rounded cursor-pointer gap-2"
            onClick={() => console.log("Plans Card clicked" + item)}
            key={item}
          >
            <PlanCard />
          </button>
        ))}
      </div>
      <div>
        <PlanDetails />
      </div>
    </div>
  );
}
