import {
  getTrainerBasics,
  getTrainerDetails,
  removeUserMembership,
  updateTrainerLogo
} from "@/utils/dashboard/trainerHelpers";
// Types
import { TrainerCreator } from "@/types/zustand-types";

const createTrainerSlice: TrainerCreator = (set) => ({
  trainerBasicsArr: [{ user_id: "", name: "" }],

  trainerDetails: { trainer_id: "", user_id: "", name: "", logo: "" },

  fetchTrainerBasicsArr: async (page: number) => {
    const trainerBasicsArr = await getTrainerBasics(page);

    set({ trainerBasicsArr });
  },

  fetchTrainerDetails: async (id: string) => {
    const response = await getTrainerDetails(id);
    if (typeof response === "boolean") return;

    set({ trainerDetails: response });
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
    planData: string,
    planId: string,
    trainerId: string
  ) => {
    // TODO: update plan data in db
    console.log("planData TODO", planData, planId, trainerId);
  }
});

export default createTrainerSlice;
