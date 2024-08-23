import { create } from "zustand";

const useInventoryStore = create((set) => ({
  theme: false,
  showSideBar: false,
  role: "",
  department_id: "",
  preStockList: [],
  modalStatus: undefined,
  modalMessage: null,
  isSuccessModal: false,
  cartItem: [],

  updateTheme: (bool) => set({ theme: bool }),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
  updateRole: (userRole) => set({ role: userRole }),
  updateDepartmentId: (id) => set({ department_id: id }),
  updateStatuss: (status) => set(() => ({ modalStatus: status })),
  updateModalMessage: (message) => set(() => ({ modalMessage: message })),
  updateSuccessModal: (bool) => set(() => ({ isSuccessModal: bool })),
  updateCartItem: (item) =>
    set((state) => ({ cartItem: [...state.cartItem, item] })),
  overrideCartItem: (item) => set(() => ({ cartItem: [...item] })),
}));

export default useInventoryStore;
