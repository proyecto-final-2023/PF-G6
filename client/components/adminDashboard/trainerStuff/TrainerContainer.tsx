import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import TrainerCard from "./TrainerCard";
import TrainerDetails from "./TrainerDetails";
import { parseTrainersArr } from "@/utils/adminHelpers";
import {
  TrainerDetailsT,
  TrainerResponse,
  UserCardT,
  UserDetailsResponse
} from "@/types/components/dashboard";

export default function TrainerContainer() {
  const [page, setPage] = useState(1);
  const [trainers, setTrainers] = useState<UserCardT[]>([]);

  const nextPage = () => setPage((prev) => prev + 1);

  const prevPage = () => setPage((prev) => prev - 1);

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
        logo: data.imgURL
      };

      setTrainerDetails(parsedDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // TODO: add error handling
      const { data }: { data: TrainerResponse[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trainers?page=${page}`
      );
      console.log("data", data);

      const parsedResponse = parseTrainersArr(data, clickHandler);

      setTrainers(parsedResponse);
    };
    fetchData();
  }, [page]);

  console.log("trainer", trainers);

  const [trainerDetails, setTrainerDetails] = useState<TrainerDetailsT>({
    user_id: "",
    name: "",
    logo: ""
  });

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
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      <div className="d7">
        {trainerDetails.user_id && (
          <TrainerDetails
            user_id={trainerDetails.user_id}
            name={trainerDetails.name}
            logo={trainerDetails.logo}
          />
        )}
      </div>
    </div>
  );
}
