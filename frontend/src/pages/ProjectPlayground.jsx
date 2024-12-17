import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect, useState } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../store/terminalSocketStore";
import { Browser } from "../components/organisms/Browser/Browser";
import { Button } from "antd";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
export const ProjectPlayground = () => {

    const {projectId: projectIdFromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket } = useEditorSocketStore();
    const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();

    const [loadBrowser, setLoadBrowser] = useState(false);

    useEffect(() => {
        if(projectIdFromUrl) {
            setProjectId(projectIdFromUrl);
        
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl
                }
            });

            try {
                const ws = new WebSocket("ws://localhost:4000/terminal?projectId="+projectIdFromUrl);
                setTerminalSocket(ws);
                
            } catch(error) {
                console.log("error in ws", error);
            }
            setEditorSocket(editorSocketConn);
        }
        
    }, [setProjectId, projectIdFromUrl, setEditorSocket, setTerminalSocket]);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Allotment>
                {projectId && (
                    <Allotment.Pane minSize={250} maxSize={400} preferredSize={300}>
                        <div
                            style={{
                                backgroundColor: "#333254",
                                padding: "10px",
                                height: "100%",
                                overflow: "auto",
                            }}
                        >
                            <TreeStructure />
                        </div>
                    </Allotment.Pane>
                )}

                {/* Main Content: Editor + Terminal */}
                <Allotment.Pane minSize={300} >
                    <div  
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#282a36"
                        }}
                    >
                        <Allotment vertical={true}>
                            <EditorComponent />
                            <BrowserTerminal />
                        </Allotment>
                    </div>
                </Allotment.Pane>

                
                <Allotment.Pane preferredSize={400}>
                    <div
                        style={{
                            padding: "10px",
                            height: "100%"
                        }}
                    >
                        <Button
                            style={{ marginBottom: "10px" }}
                            onClick={() => setLoadBrowser(true)}
                        >
                            Load my browser
                        </Button>
                        {loadBrowser && projectIdFromUrl && terminalSocket && (
                            <Browser projectId={projectIdFromUrl} />
                        )}
                    </div>
                </Allotment.Pane>
            </Allotment>
        </div>
    )
}