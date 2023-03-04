import MembershipsContainer from "./membership/MembershipContainer";
import PlanContainer from "./planStuff/PlanContainer";
import TrainerContainer from "./trainerStuff/TrainerContainer";
import UserContainer from "./userStuff/UserContainer";

export default function CentralContainer() {
  return (
    <div className="w-4/5 mx-[10%] mt-20">
      {/* <MembershipsContainer /> */}
      {/* <PlanContainer /> */}
      {/* <UserContainer /> */}
      <TrainerContainer />
    </div>
  );
}
