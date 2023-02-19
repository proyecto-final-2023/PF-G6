import React from "react";
import useStore from "@/store";
// Libraries
// Types
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function App() {
  const { post, fetchPost } = useStore((state) => ({
    post: state.post,
    fetchPost: state.fetchPost,
  }));

  return (
    <main>
      <button onClick={fetchPost}>Fetch stuff</button>

      <div>{post.id}</div>
    </main>
  );
}
