import {
  TrainerResponse,
  TraineeResponse,
  UserCardT
} from "../types/components/dashboard";

// ! TRAINERS HELPERS
// * What the list of trainers gives me is pretty different from what I want to display
export function parseTrainersArr(
  data: TrainerResponse[],
  clickHandler: UserCardT["clickHandler"]
): UserCardT[] {
  const res = data.map((trainer) => {
    return parseOneTrainer(trainer, clickHandler);
  });

  return res;
}

export function parseOneTrainer(
  data: TrainerResponse,
  clickHandler: UserCardT["clickHandler"]
): UserCardT {
  const first_name = data.membership.user.first_name;
  const last_name = data.membership.user.last_name;

  const name = first_name ? `${first_name} ${last_name}` : "";
  const user_id = data.membership.userId || "no-id";

  return {
    user_id,
    name,
    clickHandler
  };
}

// ------------------------------------------------------------
// ! TRAINEES HELPERS
export function parseTraineesArr(
  data: TraineeResponse[],
  clickHandler: UserCardT["clickHandler"]
): UserCardT[] {
  const res = data.map((trainee) => {
    return parseOneTrainee(trainee, clickHandler);
  });

  return res;
}

export function parseOneTrainee(
  data: TraineeResponse,
  clickHandler: UserCardT["clickHandler"]
): UserCardT {
  const first_name = data.membership.user.first_name;
  const last_name = data.membership.user.last_name;

  const name = first_name ? `${first_name} ${last_name}` : "";
  const user_id = data.membership.userId || "no-id";

  return {
    user_id,
    name,
    clickHandler
  };
}
