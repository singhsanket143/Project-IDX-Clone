import './FileContextMenu.css';

import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFolderContextMenuStore } from '../../../store/folderContextMenu';

export const FolderContextMenu = ({ x, y, path }) => {
  const { isOpen, closeMenu } = useFolderContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  const actions = [
    { label: 'New File', action: 'newFile' },
    { label: 'New Folder', action: 'newFolder' },
    { label: 'Rename Folder', action: 'renameFolder' },
    { label: 'Delete Folder', action: 'deleteFolder' },
  ];

  let newFileName, newFolderName, newPath, permissions;

  const normalizePath = (path) => {
    // Normalize the path for Windows (handle double backslashes)
    return path.replace(/\\{2,}/g, '\\');
  };

  const getPermissions = () => {
    const perm = prompt('Enter permissions (e.g., 0644 for files or 0755 for folders):');
    if (!perm) return null;
    return perm;
  };

  const handleAction = (action) => {
    switch (action) {
      case 'newFile':
        newFileName = prompt('Enter new file name:');
        if (!newFileName) return;
        permissions = getPermissions();
        if (!permissions) return;
        editorSocket.emit('createFile', {
          pathToFileOrFolder: normalizePath(`${path}\\${newFileName}`),
          permissions,
        });
        break;

      case 'newFolder':
        newFolderName = prompt('Enter new folder name:');
        if (!newFolderName) return;
        permissions = getPermissions();
        if (!permissions) return;
        editorSocket.emit('createFolder', {
          pathToFileOrFolder: normalizePath(`${path}\\${newFolderName}`),
          permissions,
        });
        break;

      case 'renameFolder':
        newFolderName = prompt('Enter new folder name:');
        if (!newFolderName) return;
        newPath = normalizePath(`${path}\\..\\${newFolderName}`);
        editorSocket.emit('renameFolder', {
          oldPath: normalizePath(path),
          newPath,
        });
        break;

      case 'deleteFolder':
        editorSocket.emit('deleteFolder', {
          pathToFileOrFolder: normalizePath(path),
        });
        break;

      default:
        console.error(`Unknown action: ${action}`);
    }

    closeMenu();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: 'white',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
      className='fileContextOptionsWrapper'
      onMouseLeave={closeMenu}
    >
      {actions.map(({ label, action }) => (
        <button
          key={action}
          className='fileContextButton'
          onClick={() => handleAction(action)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
