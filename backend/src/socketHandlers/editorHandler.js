import fs from "fs/promises";
import { getContainerPort } from "../containers/handleContainerCreate.js";

export const handleEditorSocketEvents = (socket, editorNamespace) => {
    socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
        try {
            const response = await fs.writeFile(pathToFileOrFolder, data);
            editorNamespace.emit("writeFileSuccess", {
                data: "File written successfully",
                path: pathToFileOrFolder,
            })
        } catch(error) {
            console.log("Error writing the file", error);
            socket.emit("error", {
                data: "Error writing the file",
            });
        }
    });


    socket.on("createFile", async ({ pathToFileOrFolder }) => {
        try {
            const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
            if(isFileAlreadyPresent) {
                socket.emit("error", {
                    data: "File already exists",
                });
                return;
            }
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.log("Error checking file existence:", err);
                socket.emit("error", {
                    data: "Error checking file existence",
                });
                return;
            }
        }

        try {
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess", {
                data: "File created successfully",
            });
        } catch(error) {
            console.log("Error creating the file", error);
            socket.emit("error", {
                data: "Error creating the file",
            });
        }
    });


    socket.on("readFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response.toString());
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder,
            })
        } catch(error) {
            console.log("Error reading the file", error);
            socket.emit("error", {
                data: "Error reading the file",
            });
        }
    });

    socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess", {
                data: "File deleted successfully",
            });
        } catch(error) {
            console.log("Error deleting the file", error);
            socket.emit("error", {
                data: "Error deleting the file",
            });
        }
    });

    socket.on("createFolder", async ({ pathToFileOrFolder}) => {
        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess", {
                data: "Folder created successfully",
            });
        } catch(error) {
            console.log("Error creating the folder", error);
            socket.emit("error", {
                data: "Error creating the folder",
            });
        }
    });

    socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
            socket.emit("deleteFolderSuccess", {
                data: "Folder deleted successfully",
            });
        } catch(error) {
            console.log("Error deleting the folder", error);
            socket.emit("error", {
                data: "Error deleting the folder",
            });
        }
    });

    socket.on("renameFolder", async ({ oldPath, newPath }) => {
        try {
            const response = await fs.rename(oldPath, newPath);
            socket.emit("renameFolderSuccess", {
                data: "Folder renamed successfully",
            });
        } catch(error) {
            console.log("Error renaming the folder", error);
            socket.emit("error", {
                data: "Error renaming the folder",
            });
        }
    })
    
    socket.on("renameFile", async ({ oldPath, newPath }) => { 
        try {
            const response = await fs.rename(oldPath, newPath);
            socket.emit("renameFileSuccess", {
                data: "File renamed successfully",
            });
        } catch(error) {
            console.log("Error renaming the file", error);
            socket.emit("error", {
                data: "Error renaming the file",
            });
        }
    })

    socket.on("getPort", async ({ containerName }) => {
        const port = await getContainerPort(containerName);
        console.log("port data", port);
        socket.emit("getPortSuccess", {
            port: port,
        })
    })

}