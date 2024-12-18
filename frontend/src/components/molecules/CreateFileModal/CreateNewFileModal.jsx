import { Modal } from 'antd';
import { useCreateFileOrFolderModal } from '../../../store/createFileOrFolderModal';
import { useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';

export const CreateNewFileModal = () => {
  const { isCreateNewFileModalOpen , setIsOpen:setIsCreateFileModalOpen , setCreatedFileName } = useCreateFileOrFolderModal();
  const [fileName, setFileName] = useState("");
  const { editorSocket } = useEditorSocketStore();
  const { folder } = useFolderContextMenuStore();

  

  const handleOk = () => {
    if (fileName) {
        console.log("Creating file", fileName,folder);
        editorSocket.emit("createFile", {
            pathToFileOrFolder: folder+"/"+fileName,
        });
        setCreatedFileName(fileName);
    }
    setIsCreateFileModalOpen(false);
    setFileName("");
};


  const handleCancel = () => {
    setIsCreateFileModalOpen(false);
    setFileName("");
  };

  return (
    <>
      <Modal title="Create New File" open={isCreateNewFileModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input 
            placeholder="Enter file name" 
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