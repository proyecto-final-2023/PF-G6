import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserDetails from "./UserDetails";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import useStore from "@/store/dashStore";

export default function UserContainer() {
  const userBasicsArr = useStore((state) => state.userBasicsArr);
  const fetchUserBasicsArr = useStore((state) => state.fetchUserBasicsArr);
  const userDetails = useStore((state) => state.userDetails);
  console.log("userDetails", userDetails);
  console.log("userBasicsArr", userBasicsArr);
  console.log("userBasicsArr.length", userBasicsArr.length);

  const [page, setPage] = useState(1);
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);
  // trainers: logo, datos plan,
  // trainees: post they did, rating they gave (rating), active status (remove plan they have)
  // memberships: our memberships to trainers

  useEffect(() => {
    fetchUserBasicsArr(page);
  }, [page]);

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Users Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {userBasicsArr.length &&
          userBasicsArr.map((item) => {
            return (
              <UserCard
                key={item.user_id}
                user_id={item.user_id}
                name={item.name}
              />
            );
          })}
      </div>
      <div className="d7">{userDetails.user_id && <UserDetails />}</div>
    </div>
  );
}
