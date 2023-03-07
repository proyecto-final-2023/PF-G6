// ? --------------------------------------------------------------------------------------------
// * TRAINERS STUFF
// ? --------------------------------------------------------------------------------------------
export type TrainerBasicsRes = {
  id_trainer: string;
  //the one he gets when buys a plan
  logo: string;
  membership: {
    //the one needed to get user details
    userId: string; //want
    user: {
      first_name: string; //want
      last_name: string; //want
      imgURL: string; //want
    };
  };
  planTrainees: {
    // this is the one to get the plans :D
    id_PlanTrainee: string;
    name: string;
    cost: string;
    description: string;
  }[];
};

export type ParsedTrainer = {
  user_id: string;
  trainer_id: string;
  name: string;
  logo: string;
};

export type TrainerDetailsRes = {
  first_name: string;
  last_name: string;
  nickname: string;
  role: string;
  imgURL: string;
  status: boolean;
  logueo: {
    email: string;
  };
  membership: {
    trainerIdTrainer: string;
  };
};
