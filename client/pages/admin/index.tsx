import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
import CentralContainer from "@/components/adminDashboard/CentralContainer";

export default function AdminIndex() {
  return (
    <div>
      <div className="grid grid-cols-[33%_66%]">
        <OptionMenu />
        <CentralContainer />
      </div>
      <DataViewContainer />
      <GraphContainer />
    </div>
  );
}
