import { Plan, PlanDetails } from "@/types/components/dashboard";

export type PlansContainerProps = {
  // basicData: Plan[];
  // fullData: PlanDetails[];
  // currentPage: number;
};

export default function PlansContainer(props: PlansContainerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <button onClick={() => console.log("Plans Card clicked")}>
        UserCard
      </button>
    </div>
  );
}
