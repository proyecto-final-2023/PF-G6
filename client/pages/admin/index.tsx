import GrapContainer from "@/components/adminDashboard/GrapContainer";
import GridContainer from "@/components/adminDashboard/GridContainer";

export default function AdminIndex() {
  return (
    <div>
      <GrapContainer />
      {/* has user/plans grid & next prev btns */}
      <GridContainer />
    </div>
  );
}
