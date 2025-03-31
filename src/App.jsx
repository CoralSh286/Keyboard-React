import { useState } from "react";
import "./App.css";
import KeyBoardPage from "./pages/KeyboardPage/KeyBoardPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  return (
    <>
      {isLogin ? ( <KeyBoardPage user={user} setUser={setUser} setIsLogin={setIsLogin} /> ) : (
      <LoginPage setUser={setUser} setIsLogin={setIsLogin}/>
      )}

    </>
  );
}

export default App;