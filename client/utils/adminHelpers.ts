import axios from "axios";

type BasicInfo = {
  first_name: string;
  nickname: string;
  imgURL: string;
};

const similatedData: BasicInfo = {
  first_name: "John",
  nickname: "Johnny bravo",
  imgURL: "missing img",
};

type Details = {
  first_name: string;
  last_name: string;
  nickname: string;
  imgURL: string;
  removeHandler: () => void;
};

const similatedDataDetails: Details = {
  first_name: "John",
  last_name: "Doe",
  nickname: "Johnny bravo",
  imgURL: "missing img",
  removeHandler: () => {},
};

// * SIMULATE DATA
export const simulateCardInfo = async () => {
  return similatedData;
};

export const similatedCardDetails = async () => {
  return similatedCardDetails;
};

// * TRAINERS
export const fetchTrainers = async (offset: number) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user?page=${offset}`
  );
  return data;
};

export const fetchTrainersDetails = async (id: string) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user/${id}`
  );
  return data;
};

// * TRAINEES
export const fetchTrainees = async (offset: number) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user?page=${offset}`
  );
  return data;
};

export const fetchTraineesDetails = async (id: string) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user/${id}`
  );
  return data;
};

// * USERS (both trainer and trainee & admin)
export const fetchUsers = async (offset: number) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user?page=${offset}`
  );
  return data;
};

export const fetchUsersDetails = async (id: string) => {
  const { data } = await axios(
    `https://fp-server-cg2b.onrender.com/user/${id}`
  );
  return data;
};
