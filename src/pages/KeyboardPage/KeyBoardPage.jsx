/** @format */

import React, { useState, useEffect } from "react";
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from "../../components/ActionsOnTextView/ActionsOnTextView";
import Header from "../../components/Header/Header";
import Popup from "../../CommonFunction/Popup/Popup";
import "./style.css";
import TextViewsContainer from "../../components/TextViewsContainer/TextViewsContainer";
import { changeFileByName, getUserByName } from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";
import { extractStyleAndText } from "../../CommonFunction/ExtarctTextAndStyle/extarctTextAndStyle";

/**
* KeyBoardPage Component
* 
* Main application page displayed after login that contains the text editor functionality.
* Manages text content, file operations, and coordinates all child components.
*/
export default function KeyBoardPage({ setIsLogin, user, setUser }) {
  const [text, setText] = useState([]);
  const [fileNameFocus, setFileNameFocus] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [change, setChange] = useState([]);
  const [filesOpen, setFilesOpen] = useState([]);

  /**
  * Refreshes open files data when user.files changes
  * Updates filesOpen with latest file data from user.files
  */
  useEffect(() => {
    if (filesOpen && filesOpen.length > 0) {
      refreshOpenFilesData();
    }
  }, [user.files]);

   /**
  * Updates the open files with the latest data from user.files
  * Keeps only files that still exist in user.files
  */
  const refreshOpenFilesData = () => {
    if (!filesOpen || !user.files) return;
    // Create a new array with updated file data but only for already open files
    const updatedOpenFiles = filesOpen.map(openFile => {
      // Find the matching file in user.files
      const updatedFile = user.files.find(userFile => userFile.name === openFile.name);
      return updatedFile || openFile;
    });
    
    const filteredOpenFiles = updatedOpenFiles.filter(openFile => 
      user.files.some(userFile => userFile.name === openFile.name)
    );
    
    // Update filesOpen state with the refreshed data
    setFilesOpen(filteredOpenFiles);
  };

  /**
  * Opens popup with provided content
  */
  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

   /**
  * Updates text content and saves changes to the current file
  * Also updates the change history
  */
  const setNewText = (newText) => {
      setText(newText);
      if (fileNameFocus != "") {
        const fileData = extractStyleAndText(newText)
        changeFileByName(user.username, fileNameFocus, fileData)
        setUser(getUserByName(user.username))
      }
      setChange((prevChange) => [...prevChange, newText]);
  };

   /**
  * Updates text content without saving to change history
  * Used for operations that shouldn't be recorded in undo/redo history
  */
  const setTextWithoutHistory = (newText) => {
    setText(newText);
  };

   /**
  * Common props object to pass to child components
  * Contains all shared state and functions
  */
  const propsRef={
    text:text ,
    user:user,
    onClose:() => {
      setIsPopupOpen(false);
    },
    fileNameFocus:fileNameFocus,
    setFilesOpen:setFilesOpen,
    filesOpen:filesOpen,
    setFileNameFocus:setFileNameFocus,
    setUser:setUser,
    openPopup:openPopup,
    setIsLogin:setIsLogin,
    setText:setNewText,
    setTextWithoutHistory:setTextWithoutHistory,
    setChange:setChange,
    change:change,
    isPopupOpen:isPopupOpen

  }

  return (
    <>
      <Header
  {...propsRef}
      />
      <main>
        <div className="flexDiv">
          <ChangeAllText
          {...propsRef}
          />
          <TextViewsContainer 
        {...propsRef}
          setText={setText} 
          
          />
          <ActionsOnTextView
       {...propsRef}
          />
        </div>
        <KeyBoard {...propsRef} />
      </main>

      <Popup {...propsRef}>
        {popupContent}
      </Popup>
    </>
  );
}
