import axios from "axios";
import {
  ParsedTrainer,
  TrainerDetailsRes,
  TrainerBasicsRes
} from "@/types/dash/trainer";

// ----------------------------------------------------------------
// ? Trainer Helpers
// ----------------------------------------------------------------
// * PARSE ONE BASIC TRAINER
function parseOneTrainer(data: TrainerBasicsRes): ParsedTrainer {
  const first_name = data.membership.user.first_name || "no-first-name";
  const last_name = data.membership.user.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "no name";

  const user_id = data.membership.userId || "no-id";
  const trainer_id = data.id_trainer || "no-trainer-id";
  const logo = data.logo || "no logo";

  return {
    user_id,
    trainer_id,
    logo,
    name
  };
}

// * PARSE ONE TRAINER DETAILS
function parseOneUserDetails(
  data: TrainerDetailsRes,
  id: string
): ParsedTrainer {
  const first_name = data.first_name || "no-first-name";
  const last_name = data.last_name || "no-last-name";
  const name = first_name ? `${first_name} ${last_name}` : "no name";

  const trainer_id = data.membership.trainerIdTrainer || "no-trainer-id";
  const logo = data.imgURL || "no logo";

  return {
    user_id: id,
    trainer_id,
    logo,
    name
  };
}

// * GET ALL BASIC TRAINERS
export async function getTrainerBasics(page: number): Promise<ParsedTrainer[]> {
  try {
    const { data }: { data: TrainerBasicsRes[] | any[] } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/trainers?page=${page}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
        }
      }
    );

    // * filter out removed trainees
    const toParse = data.filter((trainee) => trainee.membership);
    const parsedTrainers = toParse.map((trainer: TrainerBasicsRes) =>
      parseOneTrainer(trainer)
    );

    return parsedTrainers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// * GET ONE TRAINER DETAILS
export async function getTrainerDetails(
  id: string
): Promise<ParsedTrainer | Boolean> {
  try {
    const { data }: { data: TrainerDetailsRes } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
        }
      }
    );

    const parsedTrainerDetails = parseOneUserDetails(data, id);

    return parsedTrainerDetails;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateTrainerLogo(
  logoUrl: string,
  userId: string
): Promise<Boolean> {
  try {
    // const data = new FormData();
    // data.append("logo", logoUrl);

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/logo/${userId}`,
      { logo: logoUrl },
      // data,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY,
          "Content-Type": "application/json"
        }
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ----------------------------------------------------------------
// ? BOTH USE IT
// ----------------------------------------------------------------
export async function removeUserMembership(userId: string): Promise<Boolean> {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/membership/${userId}`,
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
