// The toast store: any component can show a message without passing props
import { create } from "zustand";

interface ToastStore {
  message: string;
  visible: boolean;
  showToast: (message: string) => void;
}

const TOAST_DURATION_MS = 2000;
let hideTimer: number | undefined;

export const useToastStore = create<ToastStore>((set) => ({
  message: "",
  visible: false,
  showToast: (message) => {
    set({ message, visible: true });
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => set({ visible: false }), TOAST_DURATION_MS);
  },
}));
