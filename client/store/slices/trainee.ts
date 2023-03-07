// Types
import { UserDetailsResponse } from "@/types/dash/user";
import { TraineeCreator } from "@/types/zustand-types";
import {
  getTraineeBasics,
  getTraineeDetails,
  parseOneTrainee,
  parseOneUserDetails,
  removeTraineeComment,
  removeUserMembership
} from "@/utils/adminHelpers";

const createTraineeSlice: TraineeCreator = (set) => ({
  traineeBasicsArr: [{ user_id: "", name: "" }],

  traineeDetails: { user_id: "", name: "", logo: "", email: "" },

  fetchTraineeBasicsArr: async (page: number) => {
    const res = await getTraineeBasics(page);
    const traineeBasicsArr = res.map((trainee) => parseOneTrainee(trainee));
    set({ traineeBasicsArr });
  },

  fetchTraineeDetails: async (id: string) => {
    const res = await getTraineeDetails(id);
    if (typeof res === "boolean") return;
    const traineeDetails = parseOneUserDetails(res as UserDetailsResponse, id);

    set({ traineeDetails });
  },

  removeComment: async (commentId: string) => {
    return await removeTraineeComment(commentId);
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
