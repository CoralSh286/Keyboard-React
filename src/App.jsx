import { useState } from "react";
import "./App.css";
import KeyBoardPage from "./pages/KeyboardPage/KeyBoardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Popup from "./CommonFunction/Popup/Popup";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {isLogin ? ( <KeyBoardPage setIsLogin={setIsLogin} /> ) : (
      <LoginPage setIsLogin={setIsLogin}/>
      )}

    </>
  );
}

export default App;