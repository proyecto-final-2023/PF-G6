import { create } from "zustand";
import { Trainee, Trainer } from "../types/zustand-types";
import createTrainerSlice from "./slices/trainer";
import createTraineeSlice from "./slices/trainee";

// ? Fields To modify
// trainers: logo, datos plan,
// trainees: post they did, rating they gave (rating), active status (remove plan they have)
// memberships: our memberships to trainers
const useStore = create<Trainer & Trainee>()((...all) => ({
  ...createTrainerSlice(...all),
  ...createTraineeSlice(...all)
}));

export default useStore;
