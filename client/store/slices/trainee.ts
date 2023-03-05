// Types
import { UserDetailsT } from "@/types/dash/user";
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

  updateTraineeDetails: async (data: UserDetailsT) => {}
});

export default createTraineeSlice;
