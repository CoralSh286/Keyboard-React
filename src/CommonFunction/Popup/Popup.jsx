import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './style.css';

export default function Popup({ 
  isOpen = false, 
  onClose, 
  children 
}) {
  if (!isOpen) return null;
  
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