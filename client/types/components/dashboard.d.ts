// * This file contains the types for the admin dashboard components
// * PLAN

// * USER
type BaseUser = {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string | null;
  role: "admin" | "trainer" | "trainee" | "bot" | "user";
  imgURL: string | null;
  email: string;
};

// @ UserCard
export type UserCardT = Pick<BaseUser, "id" | "first_name" | "role"> & {
  clickHandler: (id: string) => void;
};

// * Plan
// @ PlanContainer
export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  logo: string;
};

// @ PlanCard
export type PlanCardProps = {
  // more readable than Omit<Plan, ....>
  price: Plan["price"];
  name: Plan["name"];
  logo: Plan["logo"];
  index: number;
  clickHandler: (id: number) => void;
};

// * MEMBERSHIPS for trainers
export type MembershipForTrainer = {
  id: string;
  name: string;
  cost: string;
  category: string;
  description: string;
  cantTrainees: string;
};

// * EXTRAS I DONT KNOW WHERE TO PUT
export type MenuOptions = "trainer" | "trainee" | "plan";

export type TrainerPlan = {
  id: string;
  name: string;
  cost: string;
  category: string;
  description: string;
  cantTrainees: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  role: string;
  imgURL: string;
};

// with : {URL}/user/:id @ TrainerConatiner
export type UserDetailsT = {
  user_id: string;
  name: string;
  role: "trainer";
  logo: string;
  logeo: {
    email: string;
  };
  changeTrainerDetails: () => void;
  deleteTrainer: () => void;
  updateTrainer: () => void;
};

export type UserDetailsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  role: string;
  imgURL: string;
  logueo: {
    email: string;
  };
  membership: {
    trainerIdTrainer: string;
    traineeIdTrainee: string;
    /*trainer: {
      logo: string;
      planTrainees: PlanTrainee[];
    };*/
  };
};

// ! TRAINERS STUFF
export type TrainerArrResponse = {
  id_trainer: string;
  logo: string;
  membership: {
    userId: string;
    user: {
      first_name: string;
      last_name: string;
      imgURL: string;
    };
  };
};

export type TrainerCardT = {
  user_id: string;
  name: string;
  role: "trainer";
  clickHandler: (id: string) => void;
};

export type TrainerDetailsT = {
  user_id: string;
  name: string;
  role: "trainer";
  logo: string;
  changeTrainerDetails: () => void;
  deleteTrainer: () => void;
  updateTrainer: () => void;
};
