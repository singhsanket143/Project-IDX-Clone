import "./FileContextMenu.css";

import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useUserInputModalStore } from "../../../store/userInputModalStore";

export const FolderContextMenu = ({ x, y, path }) => {
  const { setIsOpen: setFolderContextMenuIsOpen } = useFolderContextMenuStore();
  const {
    setIsOpen: setUserInputModalIsOpen,
    setActionType: setUserInputModalActionType,
    setPath: setUserInputModalPath,
  } = useUserInputModalStore();

  const { editorSocket } = useEditorSocketStore();

  function handleNewFile(e) {
    e.preventDefault();
    console.log("Creating new file in", path);
    setFolderContextMenuIsOpen(false);
    setUserInputModalIsOpen(true);
    setUserInputModalActionType("createFile");
    setUserInputModalPath(path);
  }

  function handleNewFolder(e) {
    e.preventDefault();
    console.log("Creating new folder in", path);
    setFolderContextMenuIsOpen(false);
    setUserInputModalIsOpen(true);
    setUserInputModalActionType("createFolder");
    setUserInputModalPath(path);
  }

  function handleRenameFolder(e) {
    e.preventDefault();
    console.log("Renaming folder at", path);
    setFolderContextMenuIsOpen(false);
    setUserInputModalIsOpen(true);
    setUserInputModalActionType("renameFolder");
    setUserInputModalPath(path);
  }

  function handleDeleteFolder(e) {
    e.preventDefault();
    console.log("Deleting folder at", path);
    editorSocket.emit("deleteFolder", {
      pathToFileOrFolder: path,
    });
    setFolderContextMenuIsOpen(false);
  }
 

  return (
    <div
      onMouseLeave={() => {
        console.log("Mouse left");
        setFolderContextMenuIsOpen(false);
      }}
      className="fileContextOptionsWrapper"
      style={{
        left: x,
        top: y,
      }}
    >
      <button className="fileContextButton" onClick={handleNewFile}>
        New File
      </button>
      <button className="fileContextButton" onClick={handleNewFolder}>
        New Folder
      </button>
      <button className="fileContextButton" onClick={handleDeleteFolder}>
        Delete Folder
      </button>
      <button className="fileContextButton" onClick={handleRenameFolder}>
        Rename Folder
      </button>
    </div>
  );
};
