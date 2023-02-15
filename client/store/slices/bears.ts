import { BearCreator } from "@/types/zustand-types";

const createBearSlice: BearCreator = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

export default createBearSlice;
