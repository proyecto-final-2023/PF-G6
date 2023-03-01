// Manages the logic of showing details below when card is clicked & also the options of
// logic delete (trainers/trainees) or permanent delete of plans

import { PlanContainerProps } from "@/types/components/dashboard";
import { useState } from "react";

export default function PlansContainer(props: PlanContainerProps) {
  const { plan, changeDetails, deletePlan, updatePlan } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <h1>HEWO UWU</h1>
    </div>
  );
}
