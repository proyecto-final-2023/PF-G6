import { TrainerDetailsT } from "@/types/components/dashboard";

// ? Only be able to change Logo & Plan Details
export default function TrainerDetails(props: TrainerDetailsT) {
  const {
    user_id,
    name,
    role,
    logo,
    changeTrainerDetails,
    deleteTrainer,
    updateTrainer
  } = props;

  return <div>TrainerDetails ID: {user_id} POG </div>;
}
