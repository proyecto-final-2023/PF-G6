import UserCard from "./UserCard";

export type UserContainerProps = {
  // basicData: User[];
  // fullData: UserDetails[];
  // currentPage: number;
};
const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function UserContainer(props: UserContainerProps) {
  return (
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
  );
}
