import { create } from "zustand";
import { preStockItem } from "../util/type/type";

// Define the types for the state and actions
type State = {
  theme: boolean;
  showSideBar: boolean;
  role: string;
  preStockList: preStockItem[];
  modalStatus: number | undefined;
  modalMessage: string | null;
  isSuccessModal: boolean;
};

type Action = {
  updateTheme: (bool: boolean) => void;
  updateShowSideBar: () => void;
  updateRole: (userRole: string) => void;
  updatePreStockList: (stock: preStockItem[]) => void;
  overridePreStockList: (stock: preStockItem[]) => void;
  resetPreStockList: () => void;
  updateStatuss: (modalStatus: number) => void;
  updateModalMessage: (modalMessage: string) => void;
  updateSuccessModal: (bool: boolean) => void;
};
const useInventoryStore = create<State & Action>((set) => ({
  theme: false,
  showSideBar: false,
  role: "",
  preStockList: [],
  modalStatus: undefined,
  modalMessage: null,
  isSuccessModal: false,
  updateTheme: (bool) => set({ theme: bool }),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
  updateRole: (userRole) => set({ role: userRole }),
  updatePreStockList: (stock: preStockItem[]) =>
    set((state) => ({ preStockList: [...state.preStockList, ...stock] })),
  overridePreStockList: (stock: preStockItem[]) =>
    set(() => ({ preStockList: [...stock] })),
  resetPreStockList: () => set(() => ({ preStockList: [] })),
  updateStatuss: (status: number) => set(() => ({ modalStatus: status })),
  updateModalMessage: (message: string) =>
    set(() => ({ modalMessage: message })),
  updateSuccessModal: (bool: boolean) => set(() => ({ isSuccessModal: bool })),
}));

export default useInventoryStore;
