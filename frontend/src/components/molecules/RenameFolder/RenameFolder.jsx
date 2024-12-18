import { Modal } from 'antd';
import { useRenameFileOrFolderModal } from '../../../store/renameFileFolderStore';
import { useEffect, useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';


export const RenameFolderModal = () => {
  const { nameToBeRenamed, isFileorFolder, isRenameModalOpen , reset, setRenameModalOpen, oldPath} = useRenameFileOrFolderModal();
    const [folderName, setFolderName] = useState(nameToBeRenamed);
    const { editorSocket } = useEditorSocketStore();
    
    useEffect(() => {
        setFolderName(nameToBeRenamed);
   },[nameToBeRenamed])
  

   const handleOk = () => {
     const newPath = oldPath.slice(0, oldPath.lastIndexOf("/") + 1) + folderName;
     if (folderName) {
        editorSocket.emit("renameFolder", {
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
      <Modal title="Rename Folder name" open={isRenameModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input 
            placeholder="Enter folder name" 
            type="text" 
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
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