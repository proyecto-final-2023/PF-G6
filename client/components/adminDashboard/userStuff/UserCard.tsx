import { UserCardT } from "@/types/components/dashboard";

export default function UserCard(props: UserCardT) {
  const { first_name, clickHandler, id, role } = props;

  return (
    <button
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
      onClick={() => clickHandler(id)}
    >
      <p>First name {first_name}</p>
      <p>role: {role} </p>
    </button>
  );
}
