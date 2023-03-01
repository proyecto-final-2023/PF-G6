// import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import PlansContainer from "@/components/adminDashboard/PlansContainer";
import UserContainer from "@/components/adminDashboard/UserContainer";
import { fetchUsers } from "@/utils/adminHelpers";
import { MenuOptions } from "@/types/components/dashboard";

export default function AdminIndex() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const mountRef = useRef(false);
  const [menuOption, setMenuOption] = useState<MenuOptions>("trainer");

  useEffect(() => {
    if (!mountRef.current) {
      fetchUsers(page).then((data) => setData(data));
      mountRef.current = true;
    }

    // reset on unmount
    return () => {
      mountRef.current = false;
    };
  }, []);

  console.log(data);
  // ------------------->
  if (menuOption === "plan")
    return (
      <>
        <PlansContainer />
      </>
    );
  else
    return (
      <>
        <UserContainer />
      </>
    );
}
