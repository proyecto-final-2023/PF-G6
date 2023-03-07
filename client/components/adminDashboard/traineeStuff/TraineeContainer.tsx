import { useEffect, useState } from "react";
import TraineeCard from "./TraineeCard";
import TraineeDetails from "./TraineeDetails";
import useStore from "@/store/dashStore";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";

export default function TraineeContainer() {
  const trainees = useStore((state) => state.traineeBasicsArr);
  const fetchTrainees = useStore((state) => state.fetchTraineeBasicsArr);
  const traineeDetails = useStore((state) => state.traineeDetails);

  const [page, setPage] = useState(1);
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    fetchTrainees(page);
  }, [page]);

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Trainees Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {trainees.length &&
          trainees.map((item) => {
            return (
              <TraineeCard
                key={item.user_id}
                user_id={item.user_id}
                name={item.name}
              />
            );
          })}
      </div>

      <div>
        {traineeDetails.user_id && (
          <TraineeDetails user_id={traineeDetails.user_id} />
        )}
      </div>
    </div>
  );
}
