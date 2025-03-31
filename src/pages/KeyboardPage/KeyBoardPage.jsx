/** @format */

import React, { useState, useEffect } from "react";
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from "../../components/ActionsOnTextView/ActionsOnTextView";
import Header from "../../components/Header/Header";
import Popup from "../../CommonFunction/Popup/Popup";
import "./style.css";
import TextViewsContainer from "../../components/TextViewsContainer/TextViewsContainer";
import { changeFileByName, getUserByName } from "../../CommonFunction/SetLocalStorageData/setLocalStorageData";
import { extractStyleAndText } from "../../CommonFunction/ExtarctTextAndStyle/extarctTextAndStyle";
export default function KeyBoardPage({ setIsLogin, user, setUser }) {
  const [fileNameFocus, setFileNameFocus] = useState([]);
  const [text, setText] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [change, setChange] = useState([]);
  const [filesOpen, setFilesOpen] = useState([]);


  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  // Function to update text and track changes
  const setNewText = (newText) => {
    if (typeof newText === "function") {
      setText((currentText) => {
        const updatedText = newText(currentText);
        if (fileNameFocus != "") {
          user.files?.find(file => file.name == fileNameFocus)
        }
        if (fileNameFocus != "") {
          const fileData = extractStyleAndText(updatedText)

          changeFileByName(user.username, fileNameFocus, fileData)
          setUser(getUserByName(user.username))
        }
        setChange((prevChange) => [...prevChange, updatedText]);
        return updatedText;
      });
    } else {
      setText(newText);
      if (fileNameFocus != "") {
        const fileData = extractStyleAndText(newText)
        changeFileByName(user.username, fileNameFocus, fileData)
        setUser(getUserByName(user.username))
      }
      setChange((prevChange) => [...prevChange, newText]);
    }

  };
  const setTextWithoutHistory = (newText) => {
    setText(newText);
    // This doesn't update the change history
  };



  return (
    <>
      <Header
        text={text}
        user={user}
        onClose={() => {
          setIsPopupOpen(false);
        }}
        setFilesOpen={setFilesOpen}
        setFileNameFocus={setFileNameFocus}
        setUser={setUser}
        openPopup={openPopup}
        setIsLogin={setIsLogin}
        setText={setNewText}
      />

      <main>
        <div className="flexDiv">
          <ChangeAllText
            setText={setNewText}
            text={text}

          />
          <TextViewsContainer fileNameFocus={fileNameFocus} filesOpen={filesOpen} setFileNameFocus={setFileNameFocus} setFilesOpen={setFilesOpen} setText={setText} text={text} />
          <ActionsOnTextView
            setChange={setChange}
            change={change}
            setText={setNewText}
            text={text}
            setTextWithoutHistory={setTextWithoutHistory}
            openPopup={openPopup}
          />
        </div>
        <KeyBoard setText={setNewText} text={text} />
      </main>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </Popup>
    </>
  );
}
