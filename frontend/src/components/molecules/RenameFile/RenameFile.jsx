import { Modal } from 'antd';
import { useRenameFileOrFolderModal } from '../../../store/renameFileFolderStore';
import { useEffect, useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';


export const RenameFileModal = () => {
  const { nameToBeRenamed, isFileorFolder, isRenameModalOpen , reset, setRenameModalOpen, oldPath} = useRenameFileOrFolderModal();
    const [fileName, setFileName] = useState(nameToBeRenamed);
    const { editorSocket } = useEditorSocketStore();
    
    useEffect(() => {
        setFileName(nameToBeRenamed);
   },[nameToBeRenamed])
  

   const handleOk = () => {
     const newPath = oldPath.slice(0, oldPath.lastIndexOf("/") + 1) + fileName;
     if (fileName) {
        editorSocket.emit("renameFile", {
            oldPath,
            newPath: newPath
        });
    }
    reset();
  };


  const handleCancel = () => {
    setRenameModalOpen(false);
    reset();
  };

  return (
    <>
      <Modal title="Rename File name" open={isRenameModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input 
            placeholder="Enter File name" 
            type="text" 
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            style={{
            width: '100%',
            height: '30px',
            padding: '5px 2px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            backgroundColor: '#f9f9f9',
            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        }}/>
      </Modal>
    </>
  );
};