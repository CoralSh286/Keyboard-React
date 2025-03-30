import { useState } from "react";
import "./App.css";
import KeyBoard from "./components/KeyBoard/KeyBoard";
import TextView from "./components/TextView/TextView";
import ChangeAllText from "./components/ChangeAllText/ChangeAllText";

function App() {
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
  );
}

export default App;
