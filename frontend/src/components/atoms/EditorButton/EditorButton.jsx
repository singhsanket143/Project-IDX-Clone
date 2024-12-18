import './EditorButton.css';

export const EditorButton = ({ 
    isActive,
    fileName,
    hasError,
    onClose,
    onClick
}) => {

    return (
        <div
            className={`editor-tab ${isActive ? 'active' : ''} ${hasError ? 'error' : ''}`}
            style={{
                maxWidth: isActive ? "200px" : "150px",
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                {/* File Name Tab */}
                <button
                    className="editor-button"
                    style={{
                        color: isActive ? 'white' : '#959eba',
                        backgroundColor: isActive ? '#303242' : '#4a4859',
                        borderTop: isActive ? '2px solid #f7b9dd' : 'none',
                        flexGrow: 1,
                        padding: '5px 10px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={onClick}
                >
                    {fileName}
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        marginLeft: '8px',
                        color: "#ff5555",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        fontSize: "16px",
                        border: "none",
                    }}
                >
                    x
                </button>
            </div>
        </div>
    );
};
