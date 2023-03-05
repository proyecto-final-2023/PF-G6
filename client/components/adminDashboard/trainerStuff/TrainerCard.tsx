import { UserCardT } from "@/types/components/dashboard";

export default function TrainerCard(props: UserCardT) {
  const { name, clickHandler, user_id } = props;

  return (
    <button onClick={() => clickHandler(user_id)}>
      <p>{name}</p>
      <p>role: Trainer</p>
    </button>
  );
}
