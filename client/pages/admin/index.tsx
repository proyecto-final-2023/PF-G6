import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
import CentralContainer from "@/components/adminDashboard/CentralContainer";
import EditableTable from "@/components/adminDashboard/EditableUser";

export default function AdminIndex() {
  return (
    <div className="mt-20">
      <div className="flex gap-10">
        <OptionMenu />
        <div>
          <EditableTable />
        </div>
      </div>
      <CentralContainer />
      <DataViewContainer />
      <GraphContainer />
    </div>
  );
}
