import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import TraineeCard from "./TraineeCard";
import TraineeDetails from "./TraineeDetails";
// import { parseTrainersArr } from "@/utils/adminHelpers";
import {
  TraineeResponse,
  UserDetailsResponse,
  UserDetailsT
} from "@/types/components/dashboard";
import { parseTraineesArr } from "@/utils/adminHelpers";

export default function TraineeContsainer() {
  const [page, setPage] = useState(1);
  const [trainers, setTrainers] = useState<TraineeResponse[]>([]);

  const nextPage = () => setPage((prev) => prev + 1);

  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: add error handling
      const { data }: { data: TraineeResponse[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trainers?page=${page}`
      );
      console.log("data", data);

      const parsedResponse = parseTraineesArr(data, clickHandler);

      setTrainers(parsedResponse);
    };
    fetchData();
  }, [page]);

  console.log("trainer", trainers);

  const [trainerDetails, setTrainerDetails] = useState<TrainerDetailsT>({
    user_id: "",
    name: "",
    role: "trainer",
    logo: ""
  });

  const clickHandler = async (id: string /*, updateDetails: () => void*/) => {
    // make another fetch to get the user details
    try {
      const { data }: { data: UserDetailsResponse } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
      );

      const parsedDetails = {
        // since we dont get an id back from the server, we need to add the one in params
        user_id: id,
        name: `${data.first_name} ${data.last_name}`,
        role: "trainer" as TrainerDetailsT["role"],
        logo: data.imgURL
      };

      setTrainerDetails(parsedDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Trainers Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {trainers.length &&
          trainers.map((item) => {
            return (
              <TraineeCard
                key={item.user_id}
                user_id={item.user_id}
                role={item.role}
                name={item.name}
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      <div className="d7">
        {trainerDetails.user_id && (
          <TraineeDetails
            user_id={trainerDetails.user_id}
            name={trainerDetails.name}
            role={trainerDetails.role}
            logo={trainerDetails.logo}
          />
        )}
      </div>
    </div>
  );
}
