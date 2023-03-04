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
