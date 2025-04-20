import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './style.css';

// A modal popup component with overlay, close button, and customizable content.
export default function Popup({ 
  isPopupOpen = false, 
  onClose, 
  children 
}) {
  if (!isPopupOpen) return null;
  
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
}