<<<<<<< HEAD
import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import GridContainer from "@/components/adminDashboard/GridContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";

=======
import CentralContainer from "@/components/adminDashboard/CentralContainer";
import GrapContainer from "@/components/adminDashboard/GrapContainer";
>>>>>>> origin/koi-admin-dash

export default function AdminIndex() {
  return (
    <div>
      <DataViewContainer />
      <GraphContainer />
      <OptionMenu />
      {/* has user/plans grid & next prev btns */}
      <CentralContainer/>
    </div>
  );
}
