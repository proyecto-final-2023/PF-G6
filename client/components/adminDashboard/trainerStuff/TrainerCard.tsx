import useStore from "@/store/dashStore";
import { UserCardT } from "@/types/dash/user";

export default function TrainerCard(props: UserCardT) {
  const { name, user_id } = props;
  const updateTrainerDetails = useStore((state) => state.fetchTrainerDetails);

  return (
    <button onClick={() => updateTrainerDetails(user_id)}>
      <p>{name}</p>
      <p>role: Trainer</p>
    </button>
  );
}
