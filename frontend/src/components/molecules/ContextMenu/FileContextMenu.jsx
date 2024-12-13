import './ContextMenu.css';

import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const FileContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFileContextMenuStore();

    const { editorSocket } = useEditorSocketStore();

    function handleFileDelete(e) {
        e.preventDefault();
        console.log("Deleting file at", path);
        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        });
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
            >
                Rename File
            </button>

        </div>
    )
}