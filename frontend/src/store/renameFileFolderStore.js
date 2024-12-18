import { create } from "zustand";

export const useRenameFileOrFolderModal = create((set) => ({
    nameToBeRenamed: "",
    isFileorFolder: "",
    isRenameModalOpen: false,
    oldPath: "",
    newPath: "",
    setRenameModalOpen: (isOpen) => {
        set({
            isRenameModalOpen: isOpen
        });
    },
    setNameToBeRenamed: (name) => {
        set({
            nameToBeRenamed: name
        });
    },
    setIsFileorFolder: (isFile) => {
        set({
            isFileorFolder: isFile
        });
    },
    reset: () => {
        set({
            nameToBeRenamed: "",
            isFileorFolder: "",
            isRenameModalOpen: false,
            oldPath: "",
            newPath: ""
        });
    },
    setOldPath: (path) => {
        set({
            oldPath: path
        });
    },
    setNewPath: (path) => {
        set({
            newPath: path
        });
    }
}));