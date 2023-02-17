import axios from "axios";
import { UserCreator } from "@/types/zustand-types";

const createUserSlice: UserCreator = (set) => ({
  userData: { confirmed: false, imgURL: "", rol: "trainee", name: "" },

  updateConfirmed: async (state) => {
    console.log("poggers confimration");
  },

  updateData: async (imgURL, rol, fullName) => {
    console.log("poggers data");
  },

  fetchPost: async () => {
    const { data } = await axios("https://api-fp-server.onrender.com/activity");
    console.log(data);
    set({ post: data });
  },
});

export default createUserSlice;
