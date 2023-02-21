import axios from "axios";
import { PostCreator } from "@/types/zustand-types";

const createPostSlice: PostCreator = (set) => ({
  post: { id: 0, title: "", body: "" },

  fetchPost: async () => {
    const { data } = await axios("https://api-fp-server.onrender.com/activity");
    console.log(data);
    set({ post: data });
  },
});

export default createPostSlice;
