import { UserContainerProps } from "@/types/components/dashboard";

export default function UserContainer(props: UserContainerProps) {
  const { user, changeDetails, deleteUser, updateUser } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <h1>USER CONTAINER</h1>
    </div>
  );
}
