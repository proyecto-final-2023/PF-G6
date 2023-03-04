import { useState } from "react";
import NavigationBtns from "../trainterLibraries/NavigationBtns";
import PlanContainer from "./planStuff/PlanContainer";
import UserContainer from "./userStuff/UserContainer";

export default function CentralContainer() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  // ! REMOVE LATER FOR THE ACTUALL BUTTON TO SHOW TRAINERS, TRAINEES OR PLANS
  const someIf = true;

  return (
    <div className="w-4/5 mx-[10%]">
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      {someIf ? (
        <PlanContainer {...{ page }} />
      ) : (
        <UserContainer {...{ page }} />
      )}

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
    </div>
  );
}
