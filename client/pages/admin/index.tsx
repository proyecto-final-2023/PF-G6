import MenuContainer from "@/components/adminDashboard/MenuContainer";
import GrapContainer from "@/components/adminDashboard/GrapContainer";


export default function AdminIndex() {
  return (
    <div className="w-4/5">
      <GrapContainer />
      <MenuContainer />
    </div>
  );
}
