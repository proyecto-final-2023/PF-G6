import { Plan, PlanDetails } from "@/types/components/dashboard";
import PlansCard from "./PlansCard";

export type PlansContainerProps = {
  // basicData: Plan[];
  // fullData: PlanDetails[];
  // currentPage: number;
};
const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function PlansContainer(props: PlansContainerProps) {
  return (
    <>
      {someArray.map((item) => (
        <button
          className="bg-slate-700 rounded cursor-pointer gap-2"
          onClick={() => console.log("Plans Card clicked" + item)}
          key={item}
        >
          <PlansCard />
        </button>
      ))}
      {/* i */}
    </>
  );
}
