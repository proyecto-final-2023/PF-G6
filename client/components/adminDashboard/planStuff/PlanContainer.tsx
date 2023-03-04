import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import { Plan } from "@/types/components/dashboard";
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
  logo: "a"
};

export default function PlanContainer() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  const [plans, setPlans] = useState<Plan[]>([fakePlan]);
  const [details, setDetails] = useState<Plan>({
    id: "",
    logo: "",
    name: "",
    description: "",
    price: 0,
    duration: 0,
    features: []
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
      <h2 className="text-xl text-center">Plans Container</h2>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

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
