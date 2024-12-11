import { create } from "zustand";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        set({
            editorSocket: incomingSocket
        });
    }
}));