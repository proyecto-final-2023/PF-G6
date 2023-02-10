import axios from "axios";
import { PostCreator } from "../zustand-types";

const createPostSlice: PostCreator = (set) => ({
  post: { id: 0, title: "", body: "" },

  fetchPost: async () => {
    const { data } = await axios(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    set({ post: data });
  },
});

export default createPostSlice;
