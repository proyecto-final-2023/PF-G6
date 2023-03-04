// * This file contains the types for the admin dashboard components
// * PLAN

// * USER
export type User = {
  id: string;
  role: "admin" | "trainer" | "trainee";
  first_name: string;
  last_name: string;
  nickname: string | null;
  logo: string | null;
};

// @ UserCard
type UserCardProps = Omit<User, "id" | "last_name"> & {
  clickHandler: (id: number) => void;
  index: number;
};

export type UserDetails = User & {
  last_name: string;
  email: string;
  nickname: string | null;
  changeUserDetails: (id: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, data: User) => void;
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
