// Types
import { TraineeCreator } from "@/types/zustand-types";
import { getTraineeBasics, getTraineeDetails } from "@/utils/adminHelpers";

const createTraineeSlice: TraineeCreator = (set) => ({
  traineeBasicsArr: [{ user_id: "", name: "" }],

  traineeDetails: { user_id: "", name: "", logo: "", email: "" },

  fetchTraineeBasicsArr: async (page: number) => {
    const traineeBasicsArr = await getTraineeBasics(page);
    set({ traineeBasicsArr });
  },

  fetchTraineeDetails: async (id: string) => {
    const traineeDetails = await getTraineeDetails(id);
    set({ traineeDetails });
  },

  removeComment: async (commentId: string) => {
    console.log("rating TODO", commentId);
  },

  deactivateAccount: async (userId: string) => {
    console.log("rating TODO", userId);
  }
});

export default createTraineeSlice;
