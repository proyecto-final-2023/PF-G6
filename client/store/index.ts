import { create } from "zustand";
import { Bear, Fish, Post } from "./zustand-types";
import createBearSlice from "./slices/bears";
import createFishSlice from "./slices/fishes";
import createPostSlice from "./slices/post";

// const useBoundStore = create<BearSlice & FishSlice>()((...all) => ({
const useStore = create<Bear & Fish & Post>()((...all) => ({
  ...createBearSlice(...all),
  ...createFishSlice(...all),
  ...createPostSlice(...all),
}));

export default useStore;
