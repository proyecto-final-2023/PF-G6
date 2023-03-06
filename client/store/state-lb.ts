import { create, State } from "zustand";

type Param1State = {
  firstParam: string;
  setFirstParam: (param1: string) => void;
  secondParam: string;
  setSecondParam: (param2: string) => void;
};

const useParam1Store = create<Param1State>((set) => ({
  firstParam: "",
  setFirstParam: (param1) => set({ firstParam: param1 }),
  secondParam: "",
  setSecondParam: (param2) => set({ secondParam: param2 })
}));

export default useParam1Store;
