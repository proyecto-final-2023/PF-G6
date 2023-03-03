import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CardPlans from "@/components/CardPlans";

export default function TraineeDetails() {
  const [userData, setUserData] = useState([]);
  const [plans, setPlan] = useState([]);
  console.log(userData);
  const router = useRouter();
  console.log(router.query.id);
  const id = router.query.id;
  useEffect(() => {
    // make call to backend to fetch user data
    axios(`http://localhost:3001/user/${id}`)
      .then(({ data }) => {
        console.log(data);
        setUserData(data);
        setPlan(data.membership.trainer.planTrainees);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(userData);
  return (
    <div>
      <h1>Trainer</h1>
      <div className=" flex flex-col content-center justify-items-center pt-40">
        <h1>Trainer</h1>

        <img src={userData.imgURL} alt="none" width={200} height={100} />

        <h2>first name: {userData.first_name}</h2>
        <h2>last name: {userData.last_name}</h2>
        <p>Role- {userData.role}</p>
      </div>
      <div>
        <div className="flex flex-col w-40">
          {plans &&
            plans.map((e) => (
              <CardPlans
                key={e.name}
                idPlans={e.id_PlanTrainee}
                name={e.name}
                cost={e.cost}
                description={e.description}
                category={e.category}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
