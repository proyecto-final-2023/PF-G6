import useStore from "@/store/dashStore";
import { UserCardT } from "@/types/dash/user";

export default function TrainerCard(props: UserCardT) {
  const { name, user_id } = props;
  const updateTrainerDetails = useStore((state) => state.fetchTrainerDetails);

  return (
    <button
      onClick={() => updateTrainerDetails(user_id)}
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
    >
      <p>{name}</p>
      <p>role: Trainer</p>
    </button>
  );
}
