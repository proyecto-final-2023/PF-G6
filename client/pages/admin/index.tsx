import MenuContainer from "@/components/adminDashboard/MenuContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";


export default function AdminIndex() {
  return (
    <div>
      <GraphContainer />
      <OptionMenu />
      <MenuContainer />
    </div>
  );
}
