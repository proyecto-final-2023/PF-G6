import MenuContainer from "@/components/adminDashboard/MenuContainer";
import GrapContainer from "@/components/adminDashboard/GrapContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";


export default function AdminIndex() {
  return (
    <div>
      <GrapContainer />
      <OptionMenu />
      <MenuContainer />
    </div>
  );
}
