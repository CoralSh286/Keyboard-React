import React, { useState } from 'react'
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import TextView from "../../components/TextView/TextView";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from '../../components/ActionsOnTextView/ActionsOnTextView';
import Header from '../../components/Header/Header';
import Popup from '../../CommonFunction/Popup/Popup';
export default function KeyBoardPage() {
      const [text, setText] = useState("");
      const [textStyle, setTextStyle] = useState({});
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [popupContent, setPopupContent] = useState(null);
    
      const openPopup = (content) => {
        setPopupContent(content);
        setIsPopupOpen(true);
      };
    
  return (
    <>
    <Header openPopup={openPopup}/>
       <main>
         <div className="flexDiv">
           <ChangeAllText setText={setText} text={text} setTextStyle={setTextStyle} />
           <TextView text={text} style={textStyle} />
         <ActionsOnTextView text={text} openPopup={openPopup}/>
         </div>
         <KeyBoard setText={setText} />
       </main>
       <Popup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        {popupContent}
      </Popup>
    </>
  )
}
