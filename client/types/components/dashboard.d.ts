// * This file contains the types for the admin dashboard components
// * PLAN
export type Plan = {
  id: number;
  name: string;
  price: number;
};

export type PlanDetails = Plan & {
  duration: number;
  description: string;
  changePlanDetails: (id: number) => void;
  deletePlan: (id: number) => void;
  updatePlan: (id: number, data: Plan) => void;
};

// * USER
export type User = {
  id: string;
  role: "admin" | "trainer" | "trainee";
  first_name: string;
  last_name: string;
  nickname: string | null;
  logo: string | null;
};

export type UserDetails = User & {
  last_name: string;
  email: string;
  nickname: string | null;
  changeUserDetails: (id: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, data: User) => void;
};

// * EXTRAS I DONT KNOW WHERE TO PUT
export type MenuOptions = "trainer" | "trainee" | "plan";
