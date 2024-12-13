import { create } from "zustand";

export const useCreateFileModal = create((set) => ({
    createdFileName: "",
    isCreateNewFileModalOpen: false,
    setCreatedFileName: (fileName) => {
        set({
            createdFileName: fileName
        });
    },
    setIsOpen: (isOpen) => {
        set({
            isCreateNewFileModalOpen: isOpen
        });
    },
}));