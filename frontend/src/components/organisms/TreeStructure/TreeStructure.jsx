import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu";

export const TreeStructure = () => {

    const {treeStructure, setTreeStructure } = useTreeStructureStore();
    const { 
        file,
        isOpen: isFileContextOpen, 
        x: fileContextX, 
        y: fileContextY } = useFileContextMenuStore();

    const { 
        folder,
        isOpen: isFolderContextOpen, 
        x: folderContextX, 
        y: folderContextY } = useFolderContextMenuStore();

    useEffect(() => {
        if(treeStructure) {
            console.log("tree:", treeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, treeStructure]);

    return (
        <>
        {isFileContextOpen && fileContextX && fileContextY && (
            <FileContextMenu  
                x={fileContextX}
                y={fileContextY}
                path={file}
            />
        )}
        {isFolderContextOpen && folderContextX && folderContextY && (
            <FolderContextMenu  
                x={folderContextX}
                y={folderContextY}
                path={folder}
            />
        )}
            <TreeNode
                fileFolderData={treeStructure}
            />
        </>
    )
}