import './ContextMenu.css';

import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useRenameFileOrFolderModal } from '../../../store/renameFileFolderStore';

export const FileContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFileContextMenuStore();

    const { editorSocket } = useEditorSocketStore();
     const {  setRenameModalOpen , setNameToBeRenamed , setIsFileorFolder, setOldPath , setNewPath} = useRenameFileOrFolderModal();

    function handleFileDelete(e) {
        e.preventDefault();
        console.log("Deleting file at", path);
        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        });
    }

    
    function handleFileRename(e) {
        e.preventDefault();
        const nameToBeRenamed = path.split('/').pop();
        setOldPath(path);
        setNameToBeRenamed(nameToBeRenamed);
        setIsFileorFolder("file");
        setRenameModalOpen(true);
        console.log("Renaming file at", path);
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left");
                setIsOpen(false);
            }}
            className='contextOptionsWrapper'
            style={{
                left: x,
                top: y,
            }}
        >
            <button
                className='contextButton'
                onClick={handleFileDelete}
            >
                Delete File
            </button>
            <button
                className='contextButton'
                onClick={handleFileRename}
            >
                Rename File
            </button>

        </div>
    )
}