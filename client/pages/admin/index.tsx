import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
import CentralContainer from "@/components/adminDashboard/CentralContainer";
import EditableTable from "@/components/adminDashboard/EditableUser";

export default function AdminIndex() {
  return (
    <div>
      <div className="grid grid-cols-[33%_66%] mt-20">
        <OptionMenu />
        <div>
          {/* <CentralContainer /> */}
          <EditableTable />
        </div>
      </div>
      <DataViewContainer />
      <GraphContainer />
    </div>
  );
}
