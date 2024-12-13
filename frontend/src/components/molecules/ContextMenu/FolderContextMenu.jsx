import './ContextMenu.css';

import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useCreateFileModal } from '../../../store/createFileModal';
export const FolderContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFolderContextMenuStore();
    const { editorSocket } = useEditorSocketStore();
    const { setIsOpen:setIsCreateFileModalOpen } = useCreateFileModal();

    function handleFolderDelete(e) {
        e.preventDefault();
        console.log("Deleting folder at", path);
        editorSocket.emit("deleteFolder", {
            pathToFileOrFolder: path
        });
    }

    function handleFolderRename(e) {
        e.preventDefault();
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
