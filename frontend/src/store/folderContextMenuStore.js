import { create } from "zustand";

export const useFolderContextMenuStore = create((set) => ({
  x: null,
  y: null,
  isOpen: false,
  folderPath: null,

  
  setX: (incomingX) => {
    set({ x: incomingX });
  },

  
  setY: (incomingY) => {
    set({ y: incomingY });
  },

 
  setIsOpen: (incomingIsOpen) => {
    set({ isOpen: incomingIsOpen });
  },

  
  setFolderPath: (incomingFolderPath) => {
    set({ folderPath: incomingFolderPath });
  },

  // Reset all state
  reset: () => {
    set({
      x: null,
      y: null,
      isOpen: false,
      folderPath: null,
    });
  },
}));
