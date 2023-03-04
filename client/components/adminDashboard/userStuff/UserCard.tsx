import { UserCardProps } from "@/types/components/dashboard";

export default function UserCard(props: UserCardProps) {
  const { first_name, role, clickHandler, index } = props;

  return (
    <button
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
      onClick={() => clickHandler(index)}
    >
      <p>First name {first_name}</p>
      <p>Role {role}</p>
    </button>
  );
}
