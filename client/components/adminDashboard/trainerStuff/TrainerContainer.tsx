import { useEffect, useState } from "react";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import TrainerCard from "./TrainerCard";
import TrainerDetails from "./TrainerDetails";
import useStore from "@/store/dashStore";

export default function TrainerContainer() {
  const trainers = useStore((state) => state.trainerBasicsArr);
  const fetchTrainers = useStore((state) => state.fetchTrainerBasicsArr);
  const trainerDetails = useStore((state) => state.trainerDetails);

  const [page, setPage] = useState(1);
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    fetchTrainers(page);
  }, [page]);

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Trainers Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {trainers.length &&
          trainers.map((item) => {
            return (
              <TrainerCard
                key={item.user_id}
                user_id={item.user_id}
                name={item.name}
              />
            );
          })}
      </div>

      <div className="d7">
        {trainerDetails.user_id && (
          <TrainerDetails user_id={trainerDetails.user_id} />
        )}
      </div>
    </div>
  );
}
