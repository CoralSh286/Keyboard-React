import React from 'react';
import "./style.css"; // Assuming you have a CSS file for styling
export default function LoginPage(){
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <div className="input-group">
            <input type="text" placeholder="Username" className="login-input" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" className="login-input" />
          </div>
          <button type="submit" className="login-button primary-button">Login</button>
        </form>
        <div className="register-section">
          <p className="register-text">Dont have an account?</p>
          <button className="register-button secondary-button">Register</button>
        </div>
      </div>
    </div>
  );
};
