import { MenuOptions } from "@/types/components/dashboard";
import { fetchUsers } from "@/utils/adminHelpers";
import { useEffect, useRef, useState } from "react";
import PlansContainer from "./PlansContainer";
import UserContainer from "./UserContainer";

export default function MenuContainer() {
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
