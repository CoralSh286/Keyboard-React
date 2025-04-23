/** @format */

import React  from "react";
import { FaUser, FaSignOutAlt, FaSave, FaFile, FaTrash } from "react-icons/fa";
import "./style.css";
import SaveFilePopUp from "../SaveFilePopUp/SaveFilePopUp";
import { removeFileFromUser } from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";
import convertToReactElements from "../../CommonFunction/ConvertToReactElements/ConvertToReactElements";

/**
* Header Component
* 
* Displays the application header with user information, file navigation,
* and action buttons (save and logout)
*/
export default function Header({ setIsLogin, setUser, user, text, setFilesOpen,filesOpen, openPopup, onClose, setFileNameFocus, setText, setTextWithoutHistory,fileNameFocus }) {

   /**
  * Handles user logout
  * Resets login state and clears user data
  */
  const handleLogout = () => {
    setIsLogin(false);
    setUser({})
  };

   /**
  * Opens the save file popup with current text content
  */
  const handleSaveFile = () => {
    openPopup(<SaveFilePopUp onClose={onClose} file={text} userName={user.username} setUser={setUser} />);
  };

   /**
  * Opens a file for editing
  * Sets file focus, adds to open files list if not already open,
  * and loads file content into editor
  */
  const openNewFile = (file) => {
    setFileNameFocus(file.name);
    setFilesOpen(perv => {
      if (perv.length === 0) return [file]
      const index = perv.findIndex(f => f.name === file.name);
      if (index !== -1) return [...perv]
      if (index === -1) return [...perv, file]
    })
    setTextWithoutHistory(convertToReactElements(file.content))

  }

   /**
  * Handles file deletion
  * Removes file from storage, updates user data, and handles UI state changes
  */
  const deleteFileHandler = (ev, file) => {
    ev.stopPropagation(); // Prevent opening the file
    // Delete file
        const success = removeFileFromUser(user.username, file.name);
    if (success) {
      // Update user state
      const updatedUser = {
        ...user,
        files: [...user.files.filter(f => f.name !== file.name)]
      };
      setUser(updatedUser);

      // If the file is open, close it
      if (filesOpen.some(f => f.name === file.name)) {
        setFilesOpen(filesOpen.filter(f => f.name !== file.name));
      }
      // If the deleted file was focused, clear focus
      if (fileNameFocus === file.name) {
        setFileNameFocus('');
        setText([]);
      }
    }
  }
  return (
    <header className="header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <p className="user-name">{user?.username || "Guest"}</p>
      </div>

      <div className="user-files" key={user.files.length}>
        {user.files && user.files.length > 0 ? (
          user.files.map((file, index) => (
            <div key={index} className="file-card">
              <div
                className="file-info"
                onClick={() => { openNewFile(file) }}
              >
                <FaFile className="file-icon" />
                <span className="file-name">{file.name}</span>
              </div>
              <button
                className="delete-file-btn"
                onClick={(e) => { deleteFileHandler(e, file) }}
                aria-label="Delete file"
              >
                <FaTrash className="trash-icon" />
              </button>
            </div>
          ))
        ) : (
          <p className="no-files">No saved files</p>
        )}
      </div>

      <div className="action-buttons">
        <button className="save-btn" onClick={handleSaveFile}>
          <FaSave className="btn-icon" />
          <span>Save</span>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="btn-icon" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}