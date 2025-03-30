/** @format */

import React from "react";
import { FaUndo, FaSearch, FaExchangeAlt } from "react-icons/fa";
import "./style.css";

export default function ActionsOnTextView({ openPopup }) {
  const handleUndo = () => {
    openPopup(<>Undo action performed!</>);
  };
  return (
    <div className="actions-container">
      <button className="action-button">
        <FaUndo className="action-icon" onClick={handleUndo} />
        <span>Undo</span>
      </button>
      <button className="action-button">
        <FaSearch className="action-icon" />
        <span>Search</span>
      </button>
      <button className="action-button">
        <FaExchangeAlt className="action-icon" />
        <span>Replace</span>
      </button>
    </div>
  );
}
