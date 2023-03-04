import MembershipsContainer from "./membership/MembershipContainer";
import PlanContainer from "./planStuff/PlanContainer";
import UserContainer from "./userStuff/UserContainer";

export default function CentralContainer() {
  // ! REMOVE LATER FOR THE ACTUALL BUTTON TO SHOW TRAINERS, TRAINEES OR PLANS
  const someIf = true;

  return (
    <div className="w-4/5 mx-[10%]">
      {/* {someIf ? <PlanContainer /> : <UserContainer />} */}
      <MembershipsContainer />
    </div>
  );
}
