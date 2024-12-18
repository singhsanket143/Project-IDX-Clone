import { create } from "zustand";

export const useCreateFileOrFolderModal = create((set) => ({
    createdFileName: "",
    createdFolderName: "",
    isCreateNewFileModalOpen: false,
    isCreateNewFolderModalOpen: false,
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
    setCreatedFolderName: (folderName) => {
        set({
            createdFolderName: folderName
        });
    },
    setIsCreateFolderOpen: (isOpen) => {
        set({
            isCreateNewFolderModalOpen: isOpen
        });
    },
}));