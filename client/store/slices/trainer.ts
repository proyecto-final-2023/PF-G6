import { getTrainerBasics, getTrainerDetails } from "@/utils/adminHelpers";
// Types
import { TrainerCreator } from "@/types/zustand-types";
import { TraineePlan } from "@/types/dash/trainer";

const createTrainerSlice: TrainerCreator = (set) => ({
  trainerBasicsArr: [{ user_id: "", name: "" }],

  trainerDetails: { user_id: "", name: "", logo: "", email: "" },

  fetchTrainerBasicsArr: async (page: number) => {
    const trainerBasicsArr = await getTrainerBasics(page);
    set({ trainerBasicsArr });
  },

  fetchTrainerDetails: async (id: string) => {
    const trainerDetails = await getTrainerDetails(id);
    set({ trainerDetails });
  },

  updateLogo: async (logoUrl: string, userId: string) => {
    console.log("logoUrl TODO", logoUrl, userId);
  },

  updatePlanData: async (
    planData: TraineePlan,
    planId: string,
    trainerId: string
  ) => {
    console.log("planData TODO", planData, planId, trainerId);
  },

  deactivateAccount: async (userId: string) => {
    console.log("rating TODO", userId);
  }
});

export default createTrainerSlice;
