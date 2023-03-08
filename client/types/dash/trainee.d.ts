// ? --------------------------------------------------------------------------------------------
// * TRAINEE STUFF
// ? --------------------------------------------------------------------------------------------
export type ParsedTrainee = {
  user_id: string;
  trainee_id: string;
  name: string;
  profileImg: string;
};

export type TraineeBasicsRes = {
  membership: {
    planTrainee: {
      name: string;
    };
    userId: string;
    user: {
      first_name: string;
      last_name: string;
      imgURL: string;
    };
    traineeIdTrainee: string;
  };
};

export type TraineeDetailsRes = {
  first_name: string;
  last_name: string;
  imgURL: string;
  logeo: {
    email: string;
  };
  membership: {
    traineeIdTrainee: string;
  };
  nickname: string;
  role: string;
  status: Boolean;
};
