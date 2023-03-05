import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import TraineeCard from "./TraineeCard";
import TraineeDetails from "./TraineeDetails";
// import { parseTraineesArr } from "@/utils/adminHelpers";
import {
  TraineeDetailsT,
  TraineeResponse,
  UserCardT,
  UserDetailsResponse
} from "@/types/components/dashboard";
import { parseTraineesArr } from "@/utils/adminHelpers";

export default function TraineeContsainer() {
  const [page, setPage] = useState(1);
  const [trainees, setTrainees] = useState<UserCardT[]>([]);
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

      setTraineeDetails(parsedDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // TODO: add error handling
      const { data }: { data: TraineeResponse[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trainees?page=${page}`
      );
      console.log("data", data);

      const parsedResponse = parseTraineesArr(data, clickHandler);

      setTrainees(parsedResponse);
    };
    fetchData();
  }, [page]);

  console.log("trainer", trainees);

  const [trainerDetails, setTraineeDetails] = useState<TraineeDetailsT>({
    user_id: "",
    name: "",
    logo: ""
  });

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Trainees Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {trainees.length &&
          trainees.map((item) => {
            return (
              <TraineeCard
                img="rainee-img-jpog"
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
          <TraineeDetails user_id={trainerDetails.user_id} />
        )}
      </div>
    </div>
  );
}
