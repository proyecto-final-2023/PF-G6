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

// @ UserDetails
export type UserDetailsT = Pick<
  BaseUser,
  "first_name" | "last_name" | "role" | "imgURL"
> & {
  changeUserDetails: (id: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, data: BaseUser) => void;
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
