// ? --------------------------------------------------------------------------------------------
// * Shared attributes for Trainer & Trainee
// ? --------------------------------------------------------------------------------------------
export type UserCardT = {
  user_id: string;
  name: string;
};

// with : {URL}/user/:id @ TrainerContainer & TraineeContainer
export type UserDetailsT = {
  user_id: string;
  name: string;
  logo?: string;
  email: string;
};

export type UserDetailsResponse = {
  first_name: string; //want
  last_name: string; //want
  nickname: string;
  role: string;
  imgURL: string; //want
  logueo: {
    email: string; //want
  };
  membership: {
    trainerIdTrainer: string;
    traineeIdTrainee: string | null;
    trainer: {
      logo: string;
      planTrainees: {
        id_PlanTrainee: string;
        name: string;
        cost: string;
        description: string;
        category: string;
        status: boolean;
        trainerIdTrainer: string;
      }[];
    };
  };
};
