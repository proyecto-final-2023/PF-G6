// import { getTrainerBasics, getTrainerDetails } from "@/utils/adminHelpers";
// // Types
// import { TrainerCreator } from "@/types/zustand-types";
// import { UserDetailsT } from "@/types/dash/user";

import { UserDetailsT } from "@/types/dash/user";
import { UserCreator } from "@/types/zustand-types";
import { getUserBasics, getUserDetails } from "@/utils/adminHelpers";

const createUserSlice: UserCreator = (set) => ({
  userBasicsArr: [{ user_id: "", name: "" }],

  userDetails: { user_id: "", name: "", logo: "", email: "" },

  fetchUserBasicsArr: async (page: number) => {
    const userBasicsArr = await getUserBasics(page);
    set((state) => ({ userBasicsArr }));
  },

  fetchUserDetails: async (id: string) => {
    const userDetails = await getUserDetails(id);
    set((state) => ({ userDetails }));
  },

  updateUserDetails: async (data: UserDetailsT) => {}
});

export default createUserSlice;
