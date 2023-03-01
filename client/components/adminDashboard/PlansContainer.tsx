// Manages the logic of showing details below when card is clicked & also the options of
// logic delete (trainers/trainees) or permanent delete of plans

import { Plan, PlanDetails } from "@/types/components/dashboard";
import { useState } from "react";
import NavigationBtns from "../trainterLibraries/NavigationBtns";

export type PlansContainerProps = {
  basicData: Plan;
  fullData: PlanDetails;
};

export default function PlansContainer(props: PlansContainerProps[]) {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  return (
    <div>
      <NavigationBtns
        length={10}
        {...{ nextPage }}
        {...{ prevPage }}
        currentPage={page}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {/* HERE GOES THE MAP */}
      </div>
      <NavigationBtns
        length={10}
        {...{ nextPage }}
        {...{ prevPage }}
        currentPage={page}
      />
    </div>
  );
}
