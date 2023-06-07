import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling
import RegisterPage from './RegisterPage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to server, validate credentials)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    window.location.href = '/RegisterPage.js';
  };  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Sign in to your account</h2> 
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button className="loginbutton" type="submit">
            Sign In
          </button>
        </form>

        <div className="register-link">
          Don't have an account?{' '}
          <button className="register-button" onClick={handleRegister}>
            Create one
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
