/** @format */

import React from "react";
import { FaUndo, FaSearch, FaExchangeAlt } from "react-icons/fa";
import "./style.css";
import SearchInChars from "../SearchInChars/SearchInChars";
import reactElementsToString from "../../CommonFunction/ElementToStringConvertor/elementToStringConvertor";

export default function ActionsOnTextView({ openPopup , text}) {
  const handleSearch = () => {
    openPopup(<><SearchInChars text={reactElementsToString(text)}/></>);
  };
  return (
    <div className="actions-container">
      <button className="action-button" >
        <FaUndo className="action-icon" />
        <span>Undo</span>
      </button>
      <button className="action-button" onClick={handleSearch}>
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
