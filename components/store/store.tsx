import { create } from "zustand";

type State = {
  theme: boolean;
  showSideBar: boolean;
};

type Action = {
  updateTheme: (bool: boolean) => void;
  updateShowSideBar: () => void;
};

const useInventoryStore = create<State & Action>((set) => ({
  theme: false,
  showSideBar: false,
  updateTheme: (bool) => set({ theme: bool }),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
}));

export default useInventoryStore;
