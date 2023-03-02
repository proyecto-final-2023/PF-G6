import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
import CentralContainer from "@/components/adminDashboard/CentralContainer";

export default function AdminIndex() {
  return (
    <div>
      <DataViewContainer />
      <GraphContainer />
      <OptionMenu />
      {/* has user/plans grid & next prev btns */}
      <CentralContainer />
    </div>
  );
}
