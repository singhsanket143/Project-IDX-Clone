import { create } from "zustand";

export const useFolderContextMenuStore = create((set) => ({
    x: null,
    y: null,
    isOpen: false,
    folder: null,
    setX: (incomingX) => {
        set({
            x: incomingX
        });
    },
    setY: (incomingY) => {
        set({
            y: incomingY
        });
    },
    setIsOpen: (incomingIsOpen) => {
        set({
            isOpen: incomingIsOpen
        });
    },
    setFolder: (incomingFolder) => {
        set({
            folder: incomingFolder
        });
    }
}));