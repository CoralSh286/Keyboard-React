/** @format */

import React, { useState } from "react";
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
  // Store the last known state of user.files to detect changes
  const [lastKnownFiles, setLastKnownFiles] = useState(null);
  
  // Check if user.files has changed since our last known state
  const userFilesChanged = 
    lastKnownFiles !== user.files && 
    JSON.stringify(lastKnownFiles) !== JSON.stringify(user.files);
  
  // If user.files has changed, update our records and refresh open files
  if (userFilesChanged && filesOpen.length > 0) {
    // Save current file state to prevent infinite refresh loops
    setLastKnownFiles(user.files);
    
    // Perform the file refresh operation in the next tick to avoid render cycle issues
    setTimeout(() => {
      // Get the most up-to-date file information
      const currentUserFiles = getUserByName(user.username).files || [];
      
      // Create a new array of updated open files
      const updatedOpenFiles = filesOpen.map(openFile => {
        // Look for this file in the current user files
        const currentFile = currentUserFiles.find(f => f.name === openFile.name);
        return currentFile || openFile;
      });
      
      // Keep only files that still exist in the user's file collection
      const filteredFiles = updatedOpenFiles.filter(openFile => 
        currentUserFiles.some(userFile => userFile.name === openFile.name)
      );
      
      // Update the open files with the refreshed data
      setFilesOpen(filteredFiles);
    }, 0);
  }

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
    if (fileNameFocus !== "") {
      // Extract file data from the new text
      const fileData = extractStyleAndText(newText);
      
      // Save changes to the file
      changeFileByName(user.username, fileNameFocus, fileData);
      
      // Get updated user data with the changed file
      const updatedUser = getUserByName(user.username);
      
      // Update the user state to reflect file changes
      setUser(updatedUser);
      
      // Mark the files as changed to trigger refresh on next render
      setLastKnownFiles(null);
    }
    
    // Update change history
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
  * Function to force refresh files from the current user state
  * Can be called manually when files need to be synchronized
  */
  const forceRefreshFiles = () => {
    if (!user.files || !filesOpen || filesOpen.length === 0) return;
    
    // Get the very latest user data
    const currentUser = getUserByName(user.username);
    const currentFiles = currentUser.files || [];
    
    // Update open files with latest data
    const updatedOpenFiles = filesOpen.map(openFile => {
      const currentFile = currentFiles.find(f => f.name === openFile.name);
      return currentFile || openFile;
    });
    
    // Filter out deleted files
    const filteredFiles = updatedOpenFiles.filter(openFile => 
      currentFiles.some(userFile => userFile.name === openFile.name)
    );
    
    // Update filesOpen state
    setFilesOpen(filteredFiles);
    
    // Update our tracking state
    setLastKnownFiles(currentFiles);
  };

  /**
  * Custom setUser function that ensures file refresh happens after user updates
  */
  const handleUserUpdate = (newUser) => {
    // Update user state
    setUser(newUser);
    
    // Mark files as changed to trigger refresh
    setLastKnownFiles(null);
  };

  /**
  * Common props object to pass to child components
  * Contains all shared state and functions
  */
  const propsRef = {
    text: text,
    user: user,
    onClose: () => {
      setIsPopupOpen(false);
    },
    fileNameFocus: fileNameFocus,
    setFilesOpen: (newFiles) => {
      setFilesOpen(newFiles);
    },
    filesOpen: filesOpen,
    setFileNameFocus: setFileNameFocus,
    setUser: handleUserUpdate,
    openPopup: openPopup,
    setIsLogin: setIsLogin,
    setText: setNewText,
    setTextWithoutHistory: setTextWithoutHistory,
    setChange: setChange,
    change: change,
    isPopupOpen: isPopupOpen,
    // Expose force refresh function to child components
    refreshFiles: forceRefreshFiles
  };

  return (
    <>
      <Header {...propsRef} />
      <main>
        <div className="flexDiv">
          <ChangeAllText {...propsRef} />
          <TextViewsContainer 
            {...propsRef}
            setText={setText} 
          />
          <ActionsOnTextView {...propsRef} />
        </div>
        <KeyBoard {...propsRef} />
      </main>

      <Popup {...propsRef}>
        {popupContent}
      </Popup>
    </>
  );
}