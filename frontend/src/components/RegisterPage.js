import React, { useState } from 'react';
import './RegisterPage.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., send data to server, create a new user)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User Type:', userType);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-header">Create an account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">Username</label>
          <input
            className="register-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <label className="register-label">Email</label>
          <input
            className="register-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label className="register-label">Password</label>
          <input
            className="register-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <div className="user-type-container">
            <label className="user-type-label">User Type:</label>
            <label className="user-type-radio">
              <input
                type="radio"
                value="user"
                checked={userType === 'user'}
                onChange={handleUserTypeChange}
              />
              User
            </label>
            <label className="user-type-radio">
              <input
                type="radio"
                value="admin"
                checked={userType === 'admin'}
                onChange={handleUserTypeChange}
              />
              Admin
            </label>
          </div>

          <button className="register-button" type="submit">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?{' '}
          <button className="login-button" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
