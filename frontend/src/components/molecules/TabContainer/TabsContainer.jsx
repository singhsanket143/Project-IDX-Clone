import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { EditorButton } from "../../atoms/EditorButton/EditorButton"; // Import EditorButton

export const TabContainer = () => {
    const { tabs, activeFileTab, setActiveTab, closeTab } = useActiveFileTabStore();

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#333254",
                borderBottom: "1px solid #444",
                padding: "5px",
                overflowX : "auto",
                whiteSpace : "nowrap",
                minWidth : "50px"
            }}
        >
            {tabs.map((tab) => (
                <EditorButton
                    key={tab.path}
                    isActive={activeFileTab?.path === tab.path}
                    fileName={tab.name} 
                    hasError={false}
                    onClose={(e) => {
                        e.stopPropagation();
                        closeTab(tab.path); 
                    }}
                    onClick={() => {
                        setActiveTab(tab.path);
                    }}
                />
            ))}
        </div>
    );
};
