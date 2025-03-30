/** @format */

import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaSave, FaFile } from "react-icons/fa";
import "./style.css";

export default function Header({setIsLogin}) {
  const [userName, setUserName] = useState("John Doe");
  const [userCards, setUserCards] = useState([]);

  // Fetch user files from local storage on component mount
  useEffect(() => {
    const fetchUserFiles = () => {
      try {
        const savedFiles = JSON.parse(localStorage.getItem("userFiles")) || [];
        setUserCards(savedFiles);
      } catch (error) {
        console.error("Error fetching files from local storage:", error);
        setUserCards([]);
      }
    };

    fetchUserFiles();
  }, []);

  const handleLogout = () => {
    setIsLogin(false)
  };

  const handleSaveFile = () => {
    // Implement save functionality
    console.log("File saved");
    // You might want to update local storage here
  };

  return (
    <header className="header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <p className="user-name">{userName}</p>
      </div>
      
      <div className="user-files">
        {userCards.length > 0 ? (
          userCards.map((file, index) => (
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