import { useEffect, useState } from "react";
import axios from "axios";
import { UserCardT, UserDetailsT } from "@/types/components/dashboard";
import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import TrainerCard from "./TrainerCard";
import TrainerDetails from "./TrainerDetails";

export type TrainerResponse = {
  id_trainer: string;
  first_name: string;
  last_name: string;
  role: "trainee" | "trainer" | "user";
  nickname: string;
  logo: string;
  imgURL: string;
  logeo: { email: string };
};

export type TrainerCardT = Pick<TrainerResponse, "id_trainer" | "role"> & {
  name: string;
  clickHandler: (id: string) => void;
};

export type TrainerDetailsT = Pick<TrainerCardT, "id_trainer" | "role"> & {
  name: string;
  logo: string;
  changeTrainerDetails: () => void;
  deleteTrainer: () => void;
  updateTrainer: () => void;
};

export default function TrainerContainer() {
  const [page, setPage] = useState(1);
  const [trainers, setTrainers] = useState<TrainerCardT[]>([]);

  const nextPage = () => setPage((prev) => prev + 1);

  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: add error handling
      const { data }: { data: TrainerResponse[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trainers?page=${page}`
      );
      console.log("data", data);

      const parsedResponse = data.map((trainer) => {
        const name = `${trainer.first_name} ${trainer.last_name}`;
        const role: TrainerCardT["role"] = "trainer";

        return {
          id_trainer: trainer.id_trainer,
          name,
          role,
          clickHandler
        };
      });
      setTrainers(parsedResponse);
    };
    // console.log("trainer", trainers);
    fetchData();
  }, [page]);

  const clickHandler = async (id: string) => {
    // make another fetch to get the user details
    try {
      const { data }: { data: TrainerResponse } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
      );

      const parsedDetails = {
        id_trainer: data.id_trainer,
        name: `${data.first_name} ${data.last_name}`,
        role: "trainer" as TrainerDetailsT["role"],
        logo: data.logo,
        changeTrainerDetails,
        deleteTrainer,
        updateTrainer
      };

      setDetails(parsedDetails);
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeTrainerDetails = () => {
    console.log("changeTrainerDetails");
  };

  const deleteTrainer = () => {
    console.log("deleteTrainer");
  };

  const updateTrainer = () => {
    console.log("updateTrainer");
  };

  const [details, setDetails] = useState<TrainerDetailsT>({
    id_trainer: "",
    name: "",
    role: "trainer",
    logo: "",
    changeTrainerDetails,
    deleteTrainer,
    updateTrainer
  });

  return (
    <div className="border-white">
      <h2 className="text-xl text-center">Users Container</h2>

      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />

      <div className="grid gap-x-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 my-7">
        {trainers.length &&
          trainers.map((item) => {
            return (
              <TrainerCard
                key={item.id_trainer}
                id_trainer={item.id_trainer}
                role={item.role}
                name={item.name}
                {...{ clickHandler }}
              />
            );
          })}
      </div>
      <div className="d7">
        {details.id_trainer && (
          <TrainerDetails
            id_trainer={details.id_trainer}
            name={details.name}
            role={details.role}
            logo={details.logo}
            {...{ changeTrainerDetails }}
            {...{ deleteTrainer }}
            {...{ updateTrainer }}
          />
        )}
      </div>
    </div>
  );
}
