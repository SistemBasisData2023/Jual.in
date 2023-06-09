import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling
import axios from 'axios';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('false'); // State for admin checkbox

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9000/users/login', {
      username: username,
      password: password,
      role: isAdmin ? 'admin' : 'user'
    })
    .then((response) => {
      console.log(response);
      window.location.href = '/Home';
    }, (error) => {
      console.log(error);
    });
    // Handle login logic here (e.g., send data to server, validate credentials)
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Admin:', isAdmin);
  };

  const handleRegister = () => {
    window.location.href = '/Register';
  };  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Sign in to your account</h2> 
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Username</label>
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
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

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                checked={isAdmin}
                onChange={handleAdminChange}
              />
              Log in as admin
            </label>
          </div>

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
