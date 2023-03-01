// * This file contains the types for the admin dashboard components
// * PLAN
export type Plan = {
  id: number;
  name: string;
};

export type PlanDetails = Plan & {
  duration: number;
  price: number;
  description: string;
};

export type PlanContainerProps = {
  plan: Plan;
  changeDetails: (id: number) => void;
  deletePlan: (id: number) => void;
  updatePlan: (id: number, data: Plan) => void;
};

// * USER
export type User = {
  id: number;
  first_name: string;
  role: string;
  imgURL: string | null;
};

export type UserDetails = User & {
  last_name: string;
  email: string;
  nickname: string | null;
};

export type UserContainerProps = {
  user: User;
  changeDetails: (id: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, data: User) => void;
};

// * EXTRAS I DONT KNOW WHERE TO PUT
export type MenuOptions = "trainer" | "trainee" | "plan";
