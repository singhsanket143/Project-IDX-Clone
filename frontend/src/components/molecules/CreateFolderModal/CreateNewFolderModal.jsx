import { Modal } from 'antd';
import { useCreateFileOrFolderModal } from '../../../store/createFileOrFolderModal';
import { useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';

export const CreateNewFolderModal = () => {
  const { isCreateNewFolderModalOpen , setIsCreateFolderOpen:setIsCreateFolderModalOpen , setCreatedFolderName } = useCreateFileOrFolderModal();
  const [folderName, setFolderName] = useState("");
  const { editorSocket } = useEditorSocketStore();
  const { folder } = useFolderContextMenuStore();

  

  const handleOk = () => {
    if (folderName) {
        editorSocket.emit("createFolder", {
            pathToFileOrFolder: folder+"/"+folderName,
        });
        setCreatedFolderName(folderName);
    }
    setIsCreateFolderModalOpen(false);
    setFolderName("");
};


  const handleCancel = () => {
    setIsCreateFolderModalOpen(false);
    setFolderName("");
  };

  return (
    <>
      <Modal title="Create New Folder" open={isCreateNewFolderModalOpen} onOk={handleOk} onCancel={handleCancel}>
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