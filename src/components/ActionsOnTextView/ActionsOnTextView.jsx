/** @format */

import React from "react";
import { FaUndo, FaSearch, FaExchangeAlt } from "react-icons/fa";
import "./style.css";
import SearchInChars from "../SearchInChars/SearchInChars";
import ReplaceText from "../ReplaceText/ReplaceText";
import reactElementsToString from "../../CommonFunction/ElementToStringConvertor/elementToStringConvertor";
import { extractStyleAndText } from "../../CommonFunction/ExtarctTextAndStyle/extarctTextAndStyle";
import { changeFileByName, getUserByName } from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";

/**
* ActionsOnTextView Component
* 
* Provides a toolbar with text manipulation actions such as undo, search, and replace.
* Manages interaction with popups for search and replace operations.
*/
export default function ActionsOnTextView({
  openPopup,
  text,
  setText,
  setTextWithoutHistory,
  change,
  setChange,
  user,
  fileNameFocus,
  setUser,
}) {

   /**
  * Opens search popup to find text in the current content
  */
  const handleSearch = () => {
    openPopup(
      <>
        <SearchInChars text={reactElementsToString(text)} />
      </>
    );
  };

  /**
  * Opens replace popup to find and replace text in the current content
  */
  const handleReplace = () => {
    openPopup(
      <>
        <ReplaceText setText={setText} text={text} />
      </>
    );
  };

   /**
  * Reverts text to previous state and updates storage
  * Uses the change history to restore previous version of the text
  */
  const handleUndo = () => {
    if (change && change.length > 1) {
      const previousText = change[change.length - 2];
      setTextWithoutHistory(previousText);
      if (fileNameFocus != "") {
        const fileData = extractStyleAndText(previousText);
        changeFileByName(user.username, fileNameFocus, fileData);
        setUser(getUserByName(user.username));
      }
      setChange((prevChange) => prevChange.slice(0, -1));
    }
  };

  return (
    <div className="actions-container">
      <button className="action-button" onClick={handleUndo}>
        <FaUndo className="action-icon" />
      </button>
      <button className="action-button" onClick={handleSearch}>
        <FaSearch className="action-icon" />
      </button>
      <button className="action-button" onClick={handleReplace}>
        <FaExchangeAlt className="action-icon" />
      </button>
    </div>
  );
}
