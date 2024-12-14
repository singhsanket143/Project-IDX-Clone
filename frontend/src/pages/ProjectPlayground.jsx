import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { useUserInputModalStore } from "../store/userInputModalStore";
import { UserInputModal } from "../components/atoms/Modal/UserInputModal";

export const ProjectPlayground = () => {

    const {projectId: projectIdFromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket } = useEditorSocketStore();
    const {
        isOpen: isUserInputModalOpen, 
        actionType, 
        path

    } = useUserInputModalStore()

    useEffect(() => {
        if(projectIdFromUrl) {
            setProjectId(projectIdFromUrl);
        
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl
                }
            });
            setEditorSocket(editorSocketConn);
        }
        
    }, [setProjectId, projectIdFromUrl, setEditorSocket]);

    return (
        <>
        <div style={{ display: "flex" }}>
            {isUserInputModalOpen && <UserInputModal />}
            { projectId && (
                    <div
                        style={{
                            backgroundColor: "#333254",
                            paddingRight: "10px",
                            paddingTop: "0.3vh",
                            minWidth: "250px",
                            maxWidth: "25%",
                            height: "99.7vh",
                            overflow: "auto"
                        }}
                    >
                        <TreeStructure />
                    </div>
                )}
            <EditorComponent />
        </div>
           
            <EditorButton isActive={false} /> 
            <EditorButton isActive={true}/> 
            
        </>
    )
}