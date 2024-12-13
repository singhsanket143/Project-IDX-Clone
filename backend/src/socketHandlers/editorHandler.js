import fs from "fs/promises";
import { setPermissions } from "../utils/setPermission.js";

export const handleEditorSocketEvents = (socket, editorNamespace) => {
    
    // in windows permissions are special need so add permissions
    socket.on("writeFile", async ({ data, pathToFileOrFolder , permissions = "0644" }) => {
        try {
            const response = await fs.writeFile(pathToFileOrFolder, data);
            await setPermissions(pathToFileOrFolder, permissions);
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

    socket.on("createFile", async ({ pathToFileOrFolder, permissions = "0644"  }) => {
        console.log(pathToFileOrFolder);

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
            await setPermissions(pathToFileOrFolder, permissions);
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

    socket.on("createFolder", async ({ pathToFileOrFolder, permissions = "0755" }) => {
        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            await setPermissions(pathToFileOrFolder, permissions);
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
        console.log({
            oldPath ,
            newPath
        })
        try {
            const isFolderAlreadyPresent = await fs.stat(newPath);
            if (isFolderAlreadyPresent) {
                socket.emit("error", {
                    data: "Folder already exists",
                });
                return;
            }
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.log("Error checking folder existence:", err);
                socket.emit("error", {
                    data: "Error checking folder existence",
                });
                return;
            }
        }
    
        try {
            await fs.rename(oldPath, newPath);
            socket.emit("renameFolderSuccess", {
                data: "Folder renamed successfully",
                oldPath,
                newPath,
            });
        } catch (error) {
            console.log("Error renaming the folder", error);
            socket.emit("error", {
                data: "Error renaming the folder",
            });
        }
    });
}