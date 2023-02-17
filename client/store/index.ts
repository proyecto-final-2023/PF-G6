import { create } from "zustand";
import { Post, User } from "../types/zustand-types";
import createPostSlice from "./slices/post";
import createUserSlice from "./slices/user";

const useStore = create<User & Post>()((...all) => ({
  ...createUserSlice(...all),
  ...createPostSlice(...all),
}));

export default useStore;
