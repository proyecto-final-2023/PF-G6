import { getTrainerBasics, getTrainerDetails } from "@/utils/adminHelpers";
// Types
import { TrainerCreator } from "@/types/zustand-types";
import { UserDetailsT } from "@/types/dash/user";

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

  updateTrainerDetails: async (data: UserDetailsT) => {}
});

export default createTrainerSlice;
