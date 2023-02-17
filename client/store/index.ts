import { create } from "zustand";
import { User,Post } from "../types/zustand-types";
import createUserSlice from "./slices/user";
import createPostSlice from "./slices/post";

// const useBoundStore = create<BearSlice & FishSlice>()((...all) => ({
const useStore = create<User & Post>()((...all) => ({
  ...createUserSlice(...all),
  ...createPostSlice(...all)
  
}))

export default useStore;
