import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import GridContainer from "@/components/adminDashboard/GridContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";


export default function AdminIndex() {
  return (
    <div>
      <DataViewContainer />
      <GraphContainer />
      <OptionMenu />
      {/* has user/plans grid & next prev btns */}
      <GridContainer />
    </div>
  );
}
