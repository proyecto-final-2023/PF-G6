// ? --------------------------------------------------------------------------------------------
// * TRAINERS STUFF
// ? --------------------------------------------------------------------------------------------
export type TrainerResponse = {
  trainer_id: string;
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

// ? --------------------------------------------------------------------------------------------
// * TRAINEE STUFF
// ? --------------------------------------------------------------------------------------------
export type TraineeResponse = {
  membership: {
    userId: string;
    traineeIdTrainee: string;
    planTrainee: {
      name: string;
    };
    user: {
      first_name: string;
      last_name: string;
      imgURL: string;
    };
  };
};

// * A Plan the Trainer did for the Trainee
export type TraineePlan = {
  id_PlanTrainee: string;
  name: string;
  cost: string;
  description: string;
};
