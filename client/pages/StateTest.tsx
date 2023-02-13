import React from "react";
import useStore from "@/store";

export default function App() {
  const { bears, fishes, post, fetchPost } = useStore((state) => ({
    bears: state.bears,
    fishes: state.fishes,
    post: state.post,
    fetchPost: state.fetchPost,
  }));

  return (
    <main>
      <h2>
        Bears: <strong>{bears}</strong>
      </h2>
      <h2>
        Fish: <strong>{fishes}</strong>
      </h2>

      <button onClick={fetchPost}>Fetch stuff</button>

      <div>{post.id}</div>
    </main>
  );
}
