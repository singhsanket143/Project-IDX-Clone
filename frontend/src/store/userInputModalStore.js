import {create} from "zustand";

export const useUserInputModalStore = create((set) => ({
    isOpen: false,
    actionType: null,
    path: null,
    setIsOpen: (incomingIsOpen) => {
        set({ 
            isOpen: incomingIsOpen 
        })
    },
    setActionType: (incomingActionType) => {
        set({
            actionType : incomingActionType
        })
    },
    setPath: (incomingPath) => {
        set({
            path: incomingPath
        })
    },
}));
