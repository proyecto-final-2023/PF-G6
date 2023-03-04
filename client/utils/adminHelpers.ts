import axios from "axios";
import {
  TrainerPlan,
  BaseUser,
  TrainerArrResponse,
  TrainerCardT
} from "../types/components/dashboard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// * USERS (both trainer and trainee & admin)
export const fetchUsers = async (offset: number): Promise<BaseUser> => {
  const { data } = await axios(`${BASE_URL}/user?page=${offset}`);
  return data;
};

// * Plans for trainers (made by admin)
export const fetchPlansForTrainers = async (
  offset: number
): Promise<TrainerPlan> => {
  const { data } = await axios(`${BASE_URL}/plan?page=${offset}`);
  return data;
};

// * What the list of trainers gives me is pretty different from what I want to display
export const parseTrainersArr = (
  data: TrainerArrResponse[],
  clickHandler: TrainerCardT["clickHandler"]
): TrainerCardT[] => {
  const res = data.map((trainer) => {
    return parseOneTrainer(trainer, clickHandler);
  });

  return res;
};

export const parseOneTrainer = (
  data: TrainerArrResponse,
  clickHandler: TrainerCardT["clickHandler"]
): TrainerCardT => {
  const first_name = data.membership.user.first_name;
  const last_name = data.membership.user.last_name;

  const name = first_name ? `${first_name} ${last_name}` : "";
  const role = "trainer" as TrainerCardT["role"];
  const user_id = data.membership.userId || "no-id";

  return {
    user_id,
    name,
    role,
    clickHandler
  };
};
