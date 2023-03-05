import { useEffect } from "react";

export default function TraineeDetails({ user_id }: { user_id: string }) {
  // make a request to get the user details

  useEffect(() => {
    console.log("user_id", user_id);
  }, [user_id]);

  // do the useform stuff to update/remove details
  return <div></div>;
}
