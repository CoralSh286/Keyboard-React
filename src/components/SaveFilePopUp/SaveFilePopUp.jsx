/** @format */

import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  addNewFileToUser,
  getUserByName,
} from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";
import "./style.css";
import { extractStyleAndText } from "../../CommonFunction/ExtarctTextAndStyle/extarctTextAndStyle";

/**
 * SaveFilePopUp Component
 *
 * Modal popup that allows users to save their text content as a named file.
 * Handles file name validation and saving process.
 */
export default function SaveFilePopUp({ file, userName, onClose, setUser }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

   /**
  * Handles the file save operation
  * Validates input, processes text content, and saves to user's files
  */
  const saveFileHandler = (e) => {
    e.preventDefault();
    
    if (!fileName.trim()) {
      setError("Please enter a file name");
      return;
    }

    const fileData = extractStyleAndText(file);
    const result = addNewFileToUser(userName, {
      name: fileName,
      content: fileData,
    });
    setUser(getUserByName(userName));
    if (result) {
      if (onClose) onClose();
    } else {
      setError("Failed to save the file. Please try again.");
    }
  };

  return (
    <div className="save-popup-overlay">
      <div className="save-popup-container">
        <h3 className="save-popup-title">Save File</h3>

        {error && <p className="save-popup-error">{error}</p>}

        <form onSubmit={saveFileHandler} className="save-popup-form">
          <div className="save-popup-input-group">
            <label htmlFor="fileName">File Name:</label>
            <input
              type="text"
              id="fileName"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="save-popup-input"
            />
          </div>

          <div className="save-popup-buttons">
            <button
              type="button"
              onClick={onClose}
              className="save-popup-button cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="save-popup-button save-button">
              <FaSave className="save-icon" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
