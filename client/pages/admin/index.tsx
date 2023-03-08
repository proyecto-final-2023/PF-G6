import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
import CentralContainer from "@/components/adminDashboard/CentralContainer";
import EditableTable from "@/components/adminDashboard/EditableUser";
import { useState } from "react";

export default function AdminIndex() {
  const [option, setOption] = useState("");

  const changeOption = (option: string) => {
    setOption(option);
  };

  return (
    <div className="mt-20">
      <div className="flex gap-10">
        <OptionMenu optionChanger={changeOption} currSelection={option} />
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
