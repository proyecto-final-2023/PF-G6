import axios from "axios";
import { UserCreator } from "@/types/zustand-types";

const createUserSlice: UserCreator = (set) => ({
  userData: { confirmed: false, imgURL: "", rol: "trainee", name: "" },

  updateConfirmed: async (status) => {
    set((state) => ({ userData: { ...state.userData, confirmed: status } }));
  },

  updateData: async (imgURL, rol, fullName) => {},

  fetchPost: async () => {
    const { data } = await axios("https://api-fp-server.onrender.com/activity");
    set({ post: data });
  }
});

export default createUserSlice;
