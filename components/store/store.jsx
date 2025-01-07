import { create } from "zustand";

const useInventoryStore = create((set) => ({
  theme: false,
  department_code: "",
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
  verifyEmail: "",
  requestorType: "",
  updateTheme: (bool) => set({ theme: bool }),
  updateShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
  updateRole: (userRole) => set({ role: userRole }),
  updateDepartmentId: (id) => set({ department_id: id }),
  updateDepartmentCode: (code) => set({ department_code: code }),
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
  updateVerifyEmail: (email) => set(() => ({ verifyEmail: email })),
  updateRequestorType: (type) => set(() => ({ requestorType: type })),
}));

export default useInventoryStore;
