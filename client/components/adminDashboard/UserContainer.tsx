import { User, UserDetails } from "@/types/components/dashboard";
import UserCard from "./UserCard";

export type UserContainerProps = {
  // basicData: User[];
  // fullData: UserDetails[];
  // currentPage: number;
};

export default function UserContainer(props: UserContainerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {/* HERE GOES THE MAP */}
      <UserCard />
    </div>
  );
}
