import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;


        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabSetter(data.path, data.value, fileExtension);
        });

        incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("Write file success", data);
            // incomingSocket.emit("readFile", {
            //     pathToFileOrFolder: data.path
            // })
        });

        incomingSocket?.on("deleteFileSuccess", () => {
            projectTreeStructureSetter();
        });

        incomingSocket?.on("createFileSuccess", (data) => {
            console.log("Create file success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("createFolderSuccess", (data) => {
            console.log("Create folder success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("deleteFolderSuccess", (data) => {
            console.log("Delete folder success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("renameFolderSuccess", ({ oldPath, newPath }) => {
            console.log(`Folder renamed from ${oldPath} to ${newPath}`);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("error", (error) => {
            console.error("Socket error", error);
        });

        set({
            editorSocket: incomingSocket
        });
    }
}));