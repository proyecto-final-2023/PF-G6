import { create } from "zustand";
import { Trainee, Trainer } from "../types/zustand-types";
import createTraineeSlice from "./slices/trainee";
import createTrainerSlice from "./slices/trainer";

// const useStore = create<Trainer&User>()((...all) => ({
const useStore = create<Trainer & Trainee>()((...all) => ({
  ...createTrainerSlice(...all),
  ...createTraineeSlice(...all)
}));

export default useStore;
