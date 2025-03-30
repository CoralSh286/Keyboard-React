/** @format */

import React, { useState, useEffect } from "react";
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import TextView from "../../components/TextView/TextView";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from "../../components/ActionsOnTextView/ActionsOnTextView";
import Header from "../../components/Header/Header";
import Popup from "../../CommonFunction/Popup/Popup";
import './style.css';                                   
export default function KeyBoardPage({setIsLogin}) {
  const [text, setText] = useState("");
  const [textStyle, setTextStyle] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [change, setChange] = useState([]);

  // Function to open popup
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
  return (
    <>
      <Header openPopup={openPopup} setIsLogin={setIsLogin}/>

      <main>
        <div className="flexDiv">
          <ChangeAllText
            setText={setNewText}
            text={text}
            setTextStyle={setTextStyle}
          />
          <TextView text={text} style={textStyle} />
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
