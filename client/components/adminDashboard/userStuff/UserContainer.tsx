import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import UserDetails from "./UserDetails";
import {
  BaseUser,
  User,
  UserCardT,
  UserDetailsT
} from "@/types/components/dashboard";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";

export default function UserContainer() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  // trainers: logo, datos plan,
  // trainees: post they did, rating they gave (rating), active status (remove plan they have)
  // memberships: our memberships to trainers

  const [users, setUsers] = useState<UserCardT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: add error handling
      const { data }: { data: UserCardT[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`
      );
      setUsers(data);
    };
    fetchData();
  }, [page]);

  const clickHandler = (id: string) => {
    console.log("clickHandler", id);
    // make another fetch to get the user details
    // setDetails(users[id]);
  };
  const changeUserDetails = () => {
    console.log("changeUserDetails");
  };
  const deleteUser = () => {
    console.log("deleteUser");
  };
  const updateUser = () => {
    console.log("updateUser");
  };

  const [details, setDetails] = useState<UserDetailsT>({
    first_name: "",
    last_name: "",
    role: "bot",
    imgURL: "",
    changeUserDetails,
    deleteUser,
    updateUser
  });
  // for shorthand in Details component
  const { first_name, last_name, role } = details;

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Users Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {users.length &&
          users.map((item, index) => {
            const { id, first_name, role } = item;
            return (
              <UserCard
                key={id}
                {...{ id }}
                {...{ role }}
                {...{ first_name }}
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      {/* <div className="d7">
        {details.last_name && (
          <UserDetails
            {...{ id }}
            imgURL={details.imgURL}
            {...{ first_name }}
            {...{ last_name }}
            {...{ role }}
            {...{ changeUserDetails }}
            {...{ deleteUser }}
            {...{ updateUser }}
          />
        )}
      </div> */}
    </div>
  );
}
