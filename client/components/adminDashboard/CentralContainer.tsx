import MembershipsContainer from "./membership/MembershipContainer";
import TrainerContainer from "./trainerStuff/TrainerContainer";
import TraineeContainer from "./traineeStuff/TraineeContainer";

export default function CentralContainer() {
  return (
    <div className="w-4/5 mx-1/10 mt-20">
      {/* <MembershipsContainer/> */}
      {/* <TraineeContainer /> */}
      <TrainerContainer />
    </div>
  );
}
