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

  updateLogo: async (logoUrl: string, trainerId: string) => {
    console.log("logoUrl TODO", logoUrl);
  },

  updatePlanData: async (
    planData: TraineePlan,
    planId: string,
    trainerId: string
  ) => {
    console.log("planData TODO", planData);
  }
});

export default createTrainerSlice;
