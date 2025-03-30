/** @format */

import React, { useState, useEffect } from "react";
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import TextView from "../../components/TextView/TextView";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from "../../components/ActionsOnTextView/ActionsOnTextView";
import Header from "../../components/Header/Header";
import Popup from "../../CommonFunction/Popup/Popup";
import "./style.css";
import convertToReactElements from "../../CommonFunction/ConvertToReactElements/ConvertToReactElements";
export default function KeyBoardPage({ setIsLogin, user, setUser }) {
  const [fileNameFocus, setFileNameFocus] = useState(
    user.files[user.files.length - 1]?.name || ""
  );
  const [text, setText] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [change, setChange] = useState([]);
  const [files, setFiles] = useState(user.files);
  useEffect(() => {
    // Check if user is logged in and has files
    if (user && user.files && user.files.length > 0) {
      setFiles(user.files);
    } else {
      setFiles([]); // Set to empty array if no files exist
    }
  }, []);
  useEffect(() => {
  
  setText(
    convertToReactElements(files.find((file) => file.name === fileNameFocus)?.content) || []
  );
  },[files])
  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  // Function to update text and track changes
  const setNewText = (newText) => {
    if (typeof newText === "function") {
      setText((currentText) => {
        const updatedText = newText(currentText);
        setChange((prevChange) => [...prevChange, updatedText]);
        return updatedText;
      });
    } else {
      setText(newText);
      setChange((prevChange) => [...prevChange, newText]);
    }
  };
  const setTextWithoutHistory = (newText) => {
    setText(newText);
    // This doesn't update the change history
  };

  const handleCloseFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };


  return (
    <>
      <Header
        text={text}
        user={user}
        onClose={() => {
          setIsPopupOpen(false);
        }}
        setFiles={setFiles}
        setFileNameFocus={setFileNameFocus}
        setUser={setUser}
        openPopup={openPopup}
        setIsLogin={setIsLogin}
      />

      <main>
        <div className="flexDiv">
          <ChangeAllText
            setText={setNewText}
            text={text}
         
          />

          <div className="filesContainer">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setText(convertToReactElements(file.content));
                    setFileNameFocus(file.name);
                  }}
                  className={`fileContainer ${
                    fileNameFocus == file.name ? "fileNameFocus" : ""
                  }`}
                >
                  <h3>{file.name}</h3>
                  <button
                    className="closeBtn"
                    onClick={() => handleCloseFile(index)}
                    aria-label="Close file"
                  ></button>
                  <TextView
                    isOnFocus={fileNameFocus == file.name}
                    text={
                      fileNameFocus == file.name
                        ? text
                        : convertToReactElements(file.content) || []
                    }
                    style={{}}
                  />
                </div>
              ))
            ) : (
              <TextView text={text}  />
            )}
          </div>

          <ActionsOnTextView
            setChange={setChange}
            change={change}
            setText={setNewText}
            text={text}
            setTextWithoutHistory={setTextWithoutHistory}
            openPopup={openPopup}
          />
        </div>
        <KeyBoard setText={setNewText} />
      </main>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </Popup>
    </>
  );
}
