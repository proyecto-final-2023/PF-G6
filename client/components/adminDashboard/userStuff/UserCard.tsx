import { User } from "@/types/components/dashboard";

export default function UserCard(props: User) {
  const { first_name, id, role } = props;

  return (
    <button
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
      onClick={() => console.log("Plans Card clicked" + id)}
    >
      <p>First name {first_name}</p>
      <p>ID {id}</p>
      <p>Role {role}</p>
    </button>
  );
}
