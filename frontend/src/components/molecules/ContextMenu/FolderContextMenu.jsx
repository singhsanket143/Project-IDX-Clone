import "./fileContextMenu.css";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";


export const FolderContextMenu = () => {
  const { x, y, isOpen, folderPath, reset } =
    useFolderContextMenuStore();

  const { editorSocket } = useEditorSocketStore();

  if (!isOpen) return null;

 
  const handleNewFile = (e) => {
    e.preventDefault();
   
  };

  const handleNewFolder = (e) => {
    e.preventDefault();
    
  };

  const handleRenameFolder = (e) => {
    e.preventDefault();
    
  };

  const handleDeleteFolder = (e) => {
    e.preventDefault();
    editorSocket.emit("deleteFolder", { pathToFileOrFolder: folderPath });
    reset();
  };

  return (
    <div
      className="fileContextOptionsWrapper"
      style={{ left: x, top: y }}
      onMouseLeave={() => reset()}
    >
      <button className="fileContextButton" onClick={handleNewFile}>
        New File
      </button>
      <button className="fileContextButton" onClick={handleNewFolder}>
        New Folder
      </button>
      <button className="fileContextButton" onClick={handleRenameFolder}>
        Rename Folder
      </button>
      <button className="fileContextButton" onClick={handleDeleteFolder}>
        Delete Folder
      </button>
    </div>
  );
};
