import useStore from "@/store/dashStore";
import { UserCardT } from "@/types/dash/user";

export default function TraineeCard(props: UserCardT) {
  const { name, user_id } = props;
  const updateTraineeDetails = useStore((state) => state.fetchTraineeDetails);

  return (
    <button onClick={() => updateTraineeDetails(user_id)}>
      <p>{name}</p>
      <p>role: Trainee</p>
    </button>
  );
}
