// Libraries
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function TraineeDetails() {
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // make call to backend to fetch user data
  });

  console.log("user id", router.query.id);

  return <div>[id]</div>;
}
