import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { extensionToFileType } from '../../../utils/extensionToFileType';
import { useEditorValueStore } from '../../../store/edtorValueStore';

export const EditorComponent = () => {

    let timerId = null;
    const [editorState, setEditorState] = useState({
        theme: null
    });
    const [fileContent, setFileContent] = useState('');

    const { activeFileTab } = useActiveFileTabStore();
    const {setValue} = useEditorValueStore()

    const { editorSocket } = useEditorSocketStore();

    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        console.log(data);
        setEditorState({ ...editorState, theme: data });
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    function handleChange(value) {
        // Clear old timer
        if(timerId != null) {
            clearTimeout(timerId);
        }
        // set the new timer
        timerId = setTimeout(() => {
            const editorContent = value;
            setValue(editorContent)
            console.log(editorContent);
            
            console.log("Sending writefile event");
            if(activeFileTab) {
            editorSocket.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab.path
            })}
        }, 2000);
        
    }
    useEffect(() => {
        if (activeFileTab) {
            editorSocket.emit('readFile', { pathToFileOrFolder: activeFileTab.path });
        }
    }, [activeFileTab]);

    useEffect(() => {
        if (editorSocket) {
            editorSocket.on('readFileSuccess', (data) => {
                if (data.path === activeFileTab?.path) {
                    setFileContent(data.value);
                }
            });
        }

        return () => {
            if (editorSocket) {
                editorSocket.off('readFileSuccess');
            }
        };
    }, [activeFileTab, editorSocket]);


    useEffect(() => {
        downloadTheme();
    }, []);



    return (
        <>
            {   editorState.theme && activeFileTab ? 
                <Editor 
                    
                    width={'100%'}
                    defaultLanguage={undefined}
                    defaultValue='// Welcome to the playground'
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    language={extensionToFileType(activeFileTab?.extension)}
                    onChange={handleChange}
                    value={fileContent || '// Welcome to the playground'}                   
                    onMount={handleEditorTheme}
                />
                : 
                <div style={{
                    textAlign : "center",
                    fontSize : "30px",
                    color : "white",
                    marginTop : "50px"
                }} >
                    <h1>
                        Select file
                    </h1>
                </div>
            }
        </>
    )
}