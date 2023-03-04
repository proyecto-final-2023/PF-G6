import axios from "axios";
import { TrainerPlan, BaseUser } from "../types/components/dashboard";

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
