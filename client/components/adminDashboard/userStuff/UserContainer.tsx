import { useEffect, useState } from "react";
import { User } from "@/types/components/dashboard";
import UserDetails, { UserDetailsType } from "./UserDetails";
import UserCard from "./UserCard";
import axios from "axios";
import useFetch from "@/hooks/useFetch";

type UserContainerProps = {
  page: number;
};

export default function UserContainer(props: UserContainerProps) {
  const [details, setDetails] = useState<UserDetailsType>({
    id: "",
    first_name: "fn",
    last_name: "ln",
    nickname: "nk",
    logo: "",
  });

  // custom hook to handle possible errors
  const {
    data: users,
    setData: setUsers,
    cancel,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${props.page}`, [
    props.page,
  ]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  const clickHandler = (id: number) => {
    users instanceof Array && setDetails(users[id]);
  };
  console.log(details);

  return (
    <div className="border-white">
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
                {...{ last_name }}
                {...{ nickname }}
                {...{ logo }}
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      <div className="d7">
        <UserDetails {...{ details }} />
      </div>
    </div>
  );
}
