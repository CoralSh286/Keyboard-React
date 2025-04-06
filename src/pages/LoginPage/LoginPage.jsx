import React, { useState, useEffect } from 'react';
import "./style.css"; 
import { addNewUser, checkIfUserExists, checkLogin, getUserByName } from '../../CommonFunction/SetLocalStorageData/setLocalStorageData';

export default function LoginPage({ setIsLogin , setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const userAuth = checkLogin(username, password);
    const user = getUserByName(username);
    if (userAuth) {
      setError('');
      setIsLogin(true);
      setUser(user); 
    } else {
      setError('Invalid username or password');
    }
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    if(!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    if(checkIfUserExists(username)) {
      setError('Username already exists. Please choose another one.');
      return;
    }
    const newUser = {
      username: username,
      password: password,
      files: [], // Initialize with empty files array
    };
  addNewUser(newUser);
  setUser(newUser); // Set user in state
  setIsLogin(true); // Set login state to true on registration
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username" 
              className="login-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="login-button primary-button"
          >
            Login
          </button>
        </form>
        
        <div className="register-section">
          <p className="register-text">OR </p>
          <button 
            className="login-button primary-button" 
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};