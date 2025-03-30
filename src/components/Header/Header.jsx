/** @format */

import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaSave, FaFile } from "react-icons/fa";
import "./style.css";

export default function Header({ setIsLogin, user }) {
  // We'll use user.files directly instead of fetching from localStorage
  const [userFiles, setUserFiles] = useState([]);

  // Update component state when user prop changes
  useEffect(() => {
    if (user && user.files) {
      setUserFiles(user.files);
    } else {
      setUserFiles([]);
    }
  }, [user]);

  const handleLogout = () => {
    setIsLogin(false);
  };

  const handleSaveFile = () => {
    // Implementation would depend on how you want to update the user's files
    console.log("File saved");
    
    // This would need to update the actual user object in your parent component
    // You might need to pass a callback from the parent component to do this
  };

  return (
    <header className="header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <p className="user-name">{user?.username || "Guest"}</p>
      </div>
      
      <div className="user-files">
        {userFiles && userFiles.length > 0 ? (
          userFiles.map((file, index) => (
            <div key={index} className="file-card">
              <FaFile className="file-icon" />
              <span className="file-name">{file}</span>
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