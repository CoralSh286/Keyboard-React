import React, { useState } from 'react'
import KeyBoard from "../../components/KeyBoard/KeyBoard";
import TextView from "../../components/TextView/TextView";
import ChangeAllText from "../../components/ChangeAllText/ChangeAllText";
export default function KeyBoardPage() {
      const [text, setText] = useState("");
      const [textStyle, setTextStyle] = useState({});
  return (
       <main>
         <div className="flexDiv">
           <ChangeAllText setText={setText} text={text} setTextStyle={setTextStyle} />
           <TextView text={text} style={textStyle} />
         </div>
         <KeyBoard setText={setText} />
       </main>
  )
}
