/** @format */

import React from "react";
import { FaUndo, FaSearch, FaExchangeAlt } from "react-icons/fa";
import "./style.css";
import SearchInChars from "../SearchInChars/SearchInChars";
import ReplaceText from "../ReplaceText/ReplaceText";
import reactElementsToString from "../../CommonFunction/ElementToStringConvertor/elementToStringConvertor";
import { extractStyleAndText } from "../../CommonFunction/ExtarctTextAndStyle/extarctTextAndStyle";
import {
  changeFileByName,
  getUserByName,
} from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";

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
  const handleSearch = () => {
    openPopup(
      <>
        <SearchInChars text={reactElementsToString(text)} />
      </>
    );
  };

  const handleReplace = () => {
    openPopup(
      <>
        <ReplaceText setText={setText} text={text} />
      </>
    );
  };

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
