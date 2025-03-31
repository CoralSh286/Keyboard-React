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
  useEffect(() => {
    if (filesOpen && filesOpen.length > 0) {
      refreshOpenFilesData();
    }
  }, [user.files]);
  const refreshOpenFilesData = () => {
    if (!filesOpen || !user.files) return;
    
    // Create a new array with updated file data but only for already open files
    const updatedOpenFiles = filesOpen.map(openFile => {
      // Find the matching file in user.files
      const updatedFile = user.files.find(userFile => userFile.name === openFile.name);
      

      return updatedFile || openFile;
    });
    
    const filteredOpenFiles = updatedOpenFiles.filter(openFile => 
      user.files.some(userFile => userFile.name === openFile.name)
    );
    
    // Update filesOpen state with the refreshed data
    setFilesOpen(filteredOpenFiles);
  };
  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const setNewText = (newText) => {
      setText(newText);
      if (fileNameFocus != "") {
        const fileData = extractStyleAndText(newText)
        changeFileByName(user.username, fileNameFocus, fileData)
        setUser(getUserByName(user.username))
      }
      setChange((prevChange) => [...prevChange, newText]);

  };
  const setTextWithoutHistory = (newText) => {
    setText(newText);
  };

  const propsRef={
    text:text ,
    user:user,
    onClose:() => {
      setIsPopupOpen(false);
    },
    fileNameFocus:fileNameFocus,
    setFilesOpen:setFilesOpen,
    filesOpen:filesOpen,
    setFileNameFocus:setFileNameFocus,
    setUser:setUser,
    openPopup:openPopup,
    setIsLogin:setIsLogin,
    setText:setNewText,
    setTextWithoutHistory:setTextWithoutHistory,
    setChange:setChange,
    change:change,
    isPopupOpen:isPopupOpen

  }

  return (
    <>
      <Header
  {...propsRef}
      />

      <main>
        <div className="flexDiv">
          <ChangeAllText
          {...propsRef}

          />
          <TextViewsContainer 
        {...propsRef}
          setText={setText} 
          
          />
          <ActionsOnTextView
       {...propsRef}
          />
        </div>
        <KeyBoard {...propsRef} />
      </main>

      <Popup {...propsRef}>
        {popupContent}
      </Popup>
    </>
  );
}
