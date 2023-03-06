import useStore from "@/store/dashStore";

export default function UserCard(props: { user_id: string; name: string }) {
  const { user_id, name } = props;
  const fetchUserDetails = useStore((state) => state.fetchUserDetails);

  return (
    <button
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
      onClick={() => fetchUserDetails(user_id)}
    >
      <p>Name: {name}</p>
      <p>o.o</p>
    </button>
  );
}
