import { create } from "zustand";

const useInventoryStore = create((set) => ({
  theme: false,
  showSideBar: false,
  role: "",
  department_id: "",
  department: "",
  preStockList: [],
  modalStatus: undefined,
  modalMessage: null,
  isSuccessModal: false,
  cartItem: [],
  token: "",
  selectedOption: "",
  transactionDetails: [],
  updateTheme: (bool) => set({ theme: bool }),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
  updateRole: (userRole) => set({ role: userRole }),
  updateDepartmentId: (id) => set({ department_id: id }),
  updateDepartment: (dept) => set({ department: dept }),
  updateStatuss: (status) => set(() => ({ modalStatus: status })),
  updateModalMessage: (message) => set(() => ({ modalMessage: message })),
  updateSuccessModal: (bool) => set(() => ({ isSuccessModal: bool })),
  updateCartItem: (item) =>
    set((state) => ({ cartItem: [...state.cartItem, item] })),
  overrideCartItem: (item) => set(() => ({ cartItem: [...item] })),
  updateToken: (Token) => set(() => ({ token: Token })),
  updateSelectedOption: (seletected) =>
    set(() => ({ selectedOption: seletected })),
  setTransactionDetails: (item) => set(() => ({ transactionDetails: item })),
}));

export default useInventoryStore;
