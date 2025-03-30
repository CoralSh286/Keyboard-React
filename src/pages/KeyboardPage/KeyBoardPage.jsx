import React, { useState } from 'react'
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import TextView from "../../components/TextView/TextView";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
import ActionsOnTextView from '../../components/ActionsOnTextView/ActionsOnTextView';
import Header from '../../components/Header/Header';
export default function KeyBoardPage() {
      const [text, setText] = useState("");
      const [textStyle, setTextStyle] = useState({});
  return (
    <>
    <Header/>
       <main>
         <div className="flexDiv">
         <ActionsOnTextView/>
           <ChangeAllText setText={setText} text={text} setTextStyle={setTextStyle} />
           <TextView text={text} style={textStyle} />
         </div>
         <KeyBoard setText={setText} />
       </main>
    </>
  )
}
