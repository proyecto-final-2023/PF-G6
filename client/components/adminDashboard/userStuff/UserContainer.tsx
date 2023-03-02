import { useEffect, useState } from "react";
import { User } from "@/types/components/dashboard";
import UserDetails, { UserDetailsType } from "./UserDetails";
import UserCard from "./UserCard";
import axios from "axios";

type UserContainerProps = {
  page: number;
  activeId: string;
};
export default function UserContainer(props: UserContainerProps) {
  const [users, setUsers] = useState<User[]>([]);

  const [details, setDetails] = useState<UserDetailsType>({
    id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    logo: "",
  });

  const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user?page=${props.page}`
    );
    return data;
  };

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [props.page]);

  return (
    <div className="border-white">
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {users.map((item) => {
          const { id, first_name, last_name, nickname, logo, role } = item;
          return (
            <UserCard
              {...{ id }}
              {...{ role }}
              {...{ first_name }}
              {...{ last_name }}
              {...{ nickname }}
              {...{ logo }}
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
