import { TrainerCardT } from "@/types/components/dashboard";

export default function TrainerCard(props: TrainerCardT) {
  const { name, clickHandler, user_id, role } = props;

  return (
    <button onClick={() => clickHandler(user_id)}>
      <p>{name}</p>
      <p>role: {role}</p>
    </button>
  );
}
