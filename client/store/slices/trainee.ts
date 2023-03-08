// Types
import { TraineeCreator } from "@/types/zustand-types";
import {
  getTraineeBasics,
  getTraineeDetails
} from "@/utils/dashboard/traineeHelpers";
import { removeUserMembership } from "@/utils/dashboard/trainerHelpers";

const createTraineeSlice: TraineeCreator = (set) => ({
  traineeBasicsArr: [{ user_id: "", trainee_id: "", profileImg: "", name: "" }],

  traineeDetails: { user_id: "", trainee_id: "", profileImg: "", name: "" },

  fetchTraineeBasicsArr: async (page: number) => {
    const traineeBasicsArr = await getTraineeBasics(page);

    set({ traineeBasicsArr });
  },

  fetchTraineeDetails: async (id: string) => {
    const result = await getTraineeDetails(id);
    if (typeof result === "boolean") return;

    set({ traineeDetails: result });
  },

  removeComment: async (commentId: string) => {
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
  }
});

export default createTraineeSlice;
