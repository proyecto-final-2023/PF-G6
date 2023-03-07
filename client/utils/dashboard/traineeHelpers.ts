import {
  ParsedTrainee,
  TraineeBasicsRes,
  TraineeDetailsRes
} from "@/types/dash/trainee";
import { UserDetailsResponse } from "@/types/dash/user";
import axios from "axios";

// ----------------------------------------------------------------
// ? Trainee Helpers
// ----------------------------------------------------------------
// * PARSE ONE TRAINEE BASICS
function parseOneTraineeBasics(trainee: TraineeBasicsRes): ParsedTrainee {
  // console.log("this is trainee", trainee);
  const first_name = trainee.membership.user.first_name || "no-first-name";
  const last_name = trainee.membership.user.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "";

  const user_id = trainee.membership.userId || "no-id";
  const trainee_id = trainee.membership.traineeIdTrainee || "no-id";

  const res = {
    user_id,
    trainee_id,
    name,
    profileImg: trainee.membership.user.imgURL
  };

  return res;
}

// * PARSE ONE TRAINEE DETAILS
function parseOneTraineeDetails(
  data: TraineeDetailsRes,
  id: string
): ParsedTrainee {
  const first_name = data.first_name || "no-first-name";
  const last_name = data.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "";

  const trainee_id = data.membership.traineeIdTrainee || "no-id";
  const profileImg = data.imgURL || "no-img";

  return {
    user_id: id,
    trainee_id,
    name,
    profileImg
  };
}

// * GET ALL TRAINEES BASICS
export async function getTraineeBasics(page: number): Promise<ParsedTrainee[]> {
  try {
    const { data }: { data: TraineeBasicsRes[] } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/trainees?page=${page}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
        }
      }
    );

    // * filter out removed trainees
    const toParse = data.filter((trainee) => trainee.membership);
    const parsedTrainee = toParse.map((trainee) =>
      parseOneTraineeBasics(trainee)
    );

    return parsedTrainee;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// * GET ONE TRAINEE DETAILS
export async function getTraineeDetails(
  id: string
): Promise<ParsedTrainee | Boolean> {
  try {
    const { data }: { data: UserDetailsResponse | any } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
        }
      }
    );

    const parsedTraineeDetails = parseOneTraineeDetails(data, id);

    return parsedTraineeDetails;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function removeTraineeComment(
  commentId: string
): Promise<Boolean> {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/comment/${commentId}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
        }
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
