import { create } from "zustand";

interface SidebarStore {
  isMinimized: boolean;
  isOpen: boolean;
  toggle: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isMinimized: false,
  isOpen: false,
  toggle: () => set((state) => ({ isMinimized: !state.isMinimized })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
}));
