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

  updateRating: async (
    rating: number,
    traineeId: string,
    trainerId: string
  ) => {
    console.log("rating TODO", rating, traineeId, trainerId);
  },

  updateTraineeStatus: async (activeStatus: boolean, traineeId: string) => {
    console.log("activeStatus TODO", activeStatus, traineeId);
  }
});

export default createTraineeSlice;
