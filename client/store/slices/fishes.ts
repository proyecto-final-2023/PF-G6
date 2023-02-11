import { FishCreator } from "../zustand-types";

const createFishSlice: FishCreator = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

export default createFishSlice;
