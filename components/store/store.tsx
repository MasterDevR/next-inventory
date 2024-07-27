import { create } from "zustand";

type State = {
  theme: boolean;
};

type Action = {
  updateTheme: () => void;
};

const useInventoryStore = create<State & Action>((set, get) => ({
  theme: false,
  updateTheme: () => set((state) => ({ theme: !state.theme })),
}));

export default useInventoryStore;
