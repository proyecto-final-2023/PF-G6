import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import UserCard from "./UserCard";
import useFetch from "@/hooks/useFetch";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { User } from "@/types/components/dashboard";

export default function UserContainer() {
  const [details, setDetails] = useState<User>({
    id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    logo: "",
    role: "admin",
  });

  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  // custom hook to handle possible errors
  // const {
  //   data: users,
  //   // setData: setUsers,
  //   cancel,
  // } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`);

  // // secure useffect
  // useEffect(() => {
  //   return () => {
  //     cancel();
  //   };
  // }, [page]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: User[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`
      );
      setUsers(data);
    };
    fetchData();
  }, [page]);

  const clickHandler = (id: number) => {
    if (users instanceof Array) {
      setDetails(users[id]);
    } else {
      console.log("users is not an array");
    }
  };
  // for shorthand in Details component
  const { id, first_name, last_name, nickname, logo, role } = details;

  return (
    <div className="border-white">
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {users instanceof Array &&
          users.map((item, index) => {
            const { id, first_name, last_name, nickname, logo, role } = item;
            return (
              <UserCard
                key={id}
                {...{ index }}
                {...{ role }}
                {...{ first_name }}
                {...{ nickname }}
                {...{ logo }}
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      <div className="d7">
        {details.id && (
          <UserDetails
            {...{ id }}
            {...{ first_name }}
            {...{ last_name }}
            {...{ nickname }}
            {...{ logo }}
            {...{ role }}
          />
        )}
      </div>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
    </div>
  );
}
