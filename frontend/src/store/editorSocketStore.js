import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";
import { usePortStore } from "./portStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
        const portSetter = usePortStore.getState().setPort;

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

        incomingSocket?.on("downloadFileSuccess", (data) => {
            console.log("Download file success", data);
      
            const { data: fileContent, path: filePath } = data;
      
            const fileName = filePath.split(/[/\\]/).pop();
      
            console.log("File Name:", fileName);
      
            // Create a Blob from the file content
            const fileBlob = new Blob([fileContent], {
              type: "application/octet-stream",
            });
      
            // Create a link element to trigger the download
            const link = document.createElement("a");
            const url = URL.createObjectURL(fileBlob);
      
            link.href = url;
            link.download = fileName;
      
            link.click();
      
            // Clean up and revoke the object URL
            URL.revokeObjectURL(url);
          });

        incomingSocket?.on("deleteFileSuccess", () => {
            projectTreeStructureSetter();
        });

        incomingSocket?.on("getPortSuccess", ({ port }) => {
            console.log("port data", port);
            portSetter(port);
        })

        set({
            editorSocket: incomingSocket
        });
    }
}));