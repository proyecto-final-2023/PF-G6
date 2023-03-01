import GraphContainer from "@/components/adminDashboard/GraphContainer";
import GridContainer from "@/components/adminDashboard/GridContainer";

export default function AdminIndex() {
  return (
    <div>
      <GraphContainer />
      {/* has user/plans grid & next prev btns */}
      <GridContainer />
    </div>
  );
}
