import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";

export const TreeStructure = () => {

    const {treeStructure, setTreeStructure } = useTreeStructureStore();

    useEffect(() => {
        if(treeStructure) {
            console.log("tree:", treeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, treeStructure]);

    return (
        <div>
            <TreeNode
                fileFolderData={treeStructure}
            />
        </div>
    )
}