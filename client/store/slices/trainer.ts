import {
  getTrainerBasics,
  getTrainerDetails,
  parseOneTrainer,
  parseOneUserDetails,
  removeUserMembership,
  updateTrainerLogo
} from "@/utils/adminHelpers";
// Types
import { TrainerCreator } from "@/types/zustand-types";
import { TraineePlan } from "@/types/dash/trainer";
import { UserDetailsResponse } from "@/types/dash/user";

const createTrainerSlice: TrainerCreator = (set) => ({
  trainerBasicsArr: [{ user_id: "", name: "" }],

  trainerDetails: { user_id: "", name: "", logo: "", email: "" },

  fetchTrainerBasicsArr: async (page: number) => {
    const trainerResponse = await getTrainerBasics(page);
    const trainerBasicsArr = trainerResponse.map((trainer) =>
      parseOneTrainer(trainer)
    );

    set({ trainerBasicsArr });
  },

  fetchTrainerDetails: async (id: string) => {
    const response = await getTrainerDetails(id);
    if (typeof response === "boolean") return;
    const trainerDetails = parseOneUserDetails(
      response as UserDetailsResponse,
      id
    );
    set({ trainerDetails });
  },

  updateLogo: async (logoUrl: string, userId: string) => {
    const result = await updateTrainerLogo(logoUrl, userId);
    if (!result) return false;

    // if updated in db, update state
    set((state) => ({
      trainerDetails: {
        ...state.trainerDetails,
        logo: logoUrl
      }
    }));

    return true;
  },

  deactivateAccount: async (userId: string) => {
    // if removed from db, update to remove from state
    const result = await removeUserMembership(userId);
    if (!result) return false;

    set((state) => ({
      trainerBasicsArr: state.trainerBasicsArr.filter(
        (user) => user.user_id !== userId
      )
    }));

    return true;
  },

  updatePlanData: async (
    planData: TraineePlan,
    planId: string,
    trainerId: string
  ) => {
    // TODO: update plan data in db
    console.log("planData TODO", planData, planId, trainerId);
  }
});

export default createTrainerSlice;
