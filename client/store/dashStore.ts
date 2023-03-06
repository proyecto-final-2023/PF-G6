import { create } from "zustand";
import { Trainee, Trainer, UserZustand } from "../types/zustand-types";
import createTraineeSlice from "./slices/trainee";
import createTrainerSlice from "./slices/trainer";
import createUserSlice from "./slices/user";

// const useStore = create<Trainer&User>()((...all) => ({
const useStore = create<Trainer & Trainee & UserZustand>()((...all) => ({
  ...createTrainerSlice(...all),
  ...createTraineeSlice(...all),
  ...createUserSlice(...all)
}));

export default useStore;
