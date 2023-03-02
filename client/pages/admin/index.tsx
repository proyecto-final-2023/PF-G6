import CentralContainer from "@/components/adminDashboard/CentralContainer";
import GrapContainer from "@/components/adminDashboard/GrapContainer";

export default function AdminIndex() {
  return (
    <div>
      <GrapContainer />
      {/* has user/plans grid & next prev btns */}
      <CentralContainer/>
    </div>
  );
}
