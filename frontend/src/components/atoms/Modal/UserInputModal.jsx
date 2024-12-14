import React, { useEffect, useRef, useState } from "react";
import { Input, Modal } from "antd";
import { useUserInputModalStore } from "../../../store/userInputModalStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const UserInputModal = () => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null); //to add auto focus
  const {
    setIsOpen: setUserInputModalIsOpen,
    setActionType: setUserInputModalActionType,
    setPath: setUserInputModalPath,
    isOpen: userInputModalIsOpen,
    actionType: userActionType,
    path,
  } = useUserInputModalStore();

  const { editorSocket } = useEditorSocketStore();

  const handleOk = () => {
    console.log("userInput", userInput);
    if (userInput.trim().length === 0) return;

    if (userActionType === "renameFolder") {
      const oldPath = path;
      const newPath = `${path.substring(
        0,
        path.lastIndexOf("/")
      )}/${userInput}`;
      console.log("oldPath", oldPath);
      console.log("newPath", newPath);
      editorSocket.emit(userActionType, {
        oldPathToFileOrFolder: oldPath,
        newPathToFileOrFolder: newPath,
      });

    } else {
      editorSocket.emit(userActionType, {
        pathToFileOrFolder: `${path}/${userInput}`,
      });
    }

    setUserInputModalIsOpen(false);
  };

  const handleCancel = ()=>{
    setUserInputModalIsOpen(false)
    setUserInputModalActionType("")
    setUserInputModalPath("")
  }

  //TO add the auto focus
  useEffect(() => {
      inputRef.current?.focus();
  }, []);

  return (
    <Modal title="Please write name" open={userInputModalIsOpen} onOk={handleOk} onCancel={handleCancel}>
      <Input
        ref={inputRef}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Add Name"
        autoFocus
      />
    </Modal>
  );
};
