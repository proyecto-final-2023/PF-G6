import UserCard from "./UserCard";
import UserDetails from "./UserDetails";
import { useState } from "react"

export type UserContainerProps = {
  // basicData: User[];
  // fullData: UserDetails[];
  // currentPage: number;
};
const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function UserContainer() {
  const [details, setDetails] = useState(someArray[0])

  return (
    <div className="border-white" >
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {someArray.map((item) => (
          <button
            className="bg-slate-700 rounded cursor-pointer"
            onClick={() => console.log("Plans Card clicked" + item)}
            key={item}
          >
            <UserCard />
          </button>
        ))}
      </div>
      <div>
        <UserDetails />
        {details}
      </div>
    </div>
  );
}
