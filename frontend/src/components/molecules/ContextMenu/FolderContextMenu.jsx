import './ContextMenu.css';

import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useCreateFileOrFolderModal } from '../../../store/createFileOrFolderModal';
import { useRenameFileOrFolderModal } from '../../../store/renameFileFolderStore';
export const FolderContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFolderContextMenuStore();
    const { editorSocket } = useEditorSocketStore();
    const { setIsOpen: setIsCreateFileModalOpen, setIsCreateFolderOpen: setIsCreateFolderModalOpen } = useCreateFileOrFolderModal();
    const {  setRenameModalOpen , setNameToBeRenamed , setIsFileorFolder, setOldPath , setNewPath} = useRenameFileOrFolderModal();

    function handleFolderDelete(e) {
        e.preventDefault();
        console.log("Deleting folder at", path);
        editorSocket.emit("deleteFolder", {
            pathToFileOrFolder: path
        });
    }

     function handleFolderCreate(e) {
        e.preventDefault();
        setIsCreateFolderModalOpen(true);
    }

    function handleFolderRename(e) {
        e.preventDefault();
        const nameToBeRenamed = path.split('/').pop();
        setOldPath(path);
        setNameToBeRenamed(nameToBeRenamed);
        setIsFileorFolder("folder");
        setRenameModalOpen(true);
        console.log("Renaming folder at", path);
    }

    function handleCreateFile(e) {
        e.preventDefault();
        setIsCreateFileModalOpen(true);
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
                onClick={handleFolderCreate}
            >
                Create Folder
            </button>
            <button
                className='contextButton'
                onClick={handleFolderDelete}
            >
                Delete Folder
            </button>
            <button
                className='contextButton'
                onClick={handleFolderRename}
            >
                Rename Folder
            </button>
            <button
                className='contextButton'
                onClick={handleCreateFile}
            >
                Create File
            </button>
        </div>
    );
}
