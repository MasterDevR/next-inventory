import { create } from "zustand";

type State = {
  theme: boolean;
  showSideBar: boolean;
};

type Action = {
  updateTheme: () => void;
  updateShowSideBar: () => void;
};

const useInventoryStore = create<State & Action>((set, get) => ({
  theme: false,
  showSideBar: false,
  updateTheme: () => set((state) => ({ theme: !state.theme })),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
}));

export default useInventoryStore;
