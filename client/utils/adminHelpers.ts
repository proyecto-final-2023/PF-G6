import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { TrainerResponse } from "@/types/dash/trainer";
import {
  UserBasicsResponse,
  UserCardT,
  UserDetailsResponse,
  UserDetailsT
} from "@/types/dash/user";
import { async } from "@firebase/util";

// ----------------------------------------------------------------
// ? Users
// ----------------------------------------------------------------
function parseOneUser(data: UserBasicsResponse): UserCardT {
  const first_name = data.first_name || "no-first-name";
  const last_name = data.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "";
  const user_id = data.id || "no-id";

  return {
    user_id,
    name
  };
}

// * @store/slices/user.ts
export async function getUserBasics(page: number): Promise<UserCardT[]> {
  try {
    const { data }: { data: UserBasicsResponse[] | any[] } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`
    );

    const parsedData = data.map((user: UserBasicsResponse) =>
      parseOneUser(user)
    );

    return parsedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUserDetails(id: string) {
  try {
    const { data }: { data: UserDetailsResponse } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
    );

    const parsedData = parseOneUserDetails(data, id);

    return parsedData;
  } catch (error) {
    console.error(error);
    return { user_id: "", name: "", email: "" };
  }
}

// ----------------------------------------------------------------
// ? Trainer Helpers & Trainee Helpers (Users)
// ----------------------------------------------------------------
// * Helps parse TrainerDetailsResponse & TraineeDetailsResponse
function parseOneUserDetails(
  data: UserDetailsResponse,
  id: string
): UserDetailsT {
  const first_name = data.first_name || "no-first-name";
  const last_name = data.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "";
  const email = data.logueo.email || "no-email";

  // since the response for details doesn't have the user_id, I need to add it
  return {
    user_id: id,
    name,
    email
  };
}

// ----------------------------------------------------------------
// ? Trainer Helpers
// ----------------------------------------------------------------
// * Used inside a map, to help parse TrainerResponse[]
function parseOneTrainer(data: TrainerResponse): UserCardT {
  const first_name = data.membership.user.first_name || "no-first-name";
  const last_name = data.membership.user.last_name || "no-last-name";

  const name = first_name ? `${first_name} ${last_name}` : "";
  const user_id = data.membership.userId || "no-id";

  return {
    user_id,
    name
  };
}

// * @store/slices/trainer.ts
export async function getTrainerBasics(page: number): Promise<UserCardT[]> {
  try {
    const { data }: { data: TrainerResponse[] | any[] } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/trainers?page=${page}`
    );

    const parsedData = data.map((trainer) => {
      return parseOneTrainer(trainer);
    });

    return parsedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// * @store/slices/trainer.ts - here I use the shared parseOneUserDetails()
export async function getTrainerDetails(id: string): Promise<UserDetailsT> {
  try {
    const { data }: { data: UserDetailsResponse | any } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
    );

    const trainerDetails = parseOneUserDetails(data, id);

    return trainerDetails;
  } catch (error) {
    console.error(error);
    return { user_id: "", name: "", email: "" };
  }
}

// ----------------------------------------------------------------
// ? Trainee Helpers
// ----------------------------------------------------------------
// * Used inside a map, to help parse TraineeResponse[]
function parseOneTrainee(data: TrainerResponse): UserCardT {
  const first_name = data.membership.user.first_name || "no-first-name";
  const last_name = data.membership.user.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "";
  const user_id = data.membership.userId || "no-id";

  return {
    user_id,
    name
  };
}

// * @store/slices/trainee.ts
export async function getTraineeBasics(page: number): Promise<UserCardT[]> {
  try {
    const { data }: { data: TrainerResponse[] | any[] } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/trainees?page=${page}`
    );

    const parsedData = data.map((trainee) => {
      return parseOneTrainee(trainee);
    });

    return parsedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// * @store/slices/trainee.ts - here I use the shared parseOneUserDetails()
export async function getTraineeDetails(id: string): Promise<UserDetailsT> {
  try {
    const { data }: { data: UserDetailsResponse | any } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
    );

    const traineeDetails = parseOneUserDetails(data, id);

    return traineeDetails;
  } catch (error) {
    console.error(error);
    return { user_id: "", name: "", email: "" };
  }
}
// ------------------------------------------------------------
// ? MAY DO SOME STUFF LATER WITH THIS
// ------------------------------------------------------------

type BasicInfo = {
  user_id: string;
  name: string;
  logo: string;
};

type DispatchSetter = Dispatch<SetStateAction<BasicInfo>>;

type DetailsT = {
  url: string;
  id: string;
  setState: DispatchSetter;
};
