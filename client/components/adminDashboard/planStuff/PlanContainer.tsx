import axios from "axios";
import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import PlanDetails from "./PlanDetails";

const fakePlan = {
  id: "1",
  name: "Basic",
  description: "Basic plan",
  price: 10,
  duration: 1,
  features: ["1", "2", "3"],
  logo: "a",
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  logo: string;
};

export default function PlanContainer({ page }: { page: number }) {
  const [plans, setPlans] = useState<Plan[]>([fakePlan]);
  const [details, setDetails] = useState<Plan>({
    id: "",
    logo: "",
    name: "",
    description: "",
    price: 0,
    duration: 0,
    features: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // const { data }: { data: Plan[] } = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/Plan?page=${page}`
      // );
      // setPlans(data);
    };
    fetchData();
    console.log("CHANGED PAGE", page);
  }, [page]);

  const clickHandler = (id: number) => {
    setDetails(plans[id]);
  };
  // for shorthand in Details component
  const { id, name, description, price, duration, features, logo } = details;

  return (
    <div className="border-white">
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {plans.length &&
          plans.map((item, index) => {
            const { id, name, price, logo } = item;
            return (
              <PlanCard
                key={id}
                {...{ index }}
                {...{ logo }}
                {...{ clickHandler }}
                {...{ name }}
                {...{ price }}
              />
            );
          })}
      </div>
      <div className="d7">
        {details.id && (
          <PlanDetails
            {...{ id }}
            {...{ logo }}
            {...{ clickHandler }}
            {...{ name }}
            {...{ description }}
            {...{ price }}
            {...{ duration }}
            {...{ features }}
          />
        )}
      </div>
    </div>
  );
}
