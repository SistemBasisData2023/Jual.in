import React, { useState } from 'react';
import './RegisterPage.css'; // Import the CSS file for styling
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(false);

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
    setUserType(!userType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/users/register', {
      username: username,
      email: email,
      password: password,
      role: userType ? 'admin' : 'user'
    })
    .then((response) => {
      console.log(response);
      window.location.href = '/LoginPage';
    }, (error) => {
      console.log(error);
    });

    // Handle registration logic here (e.g., send data to server, create a new user)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User Type:', userType);
  };

  const handleLogin = () => {
    window.location.href = '/';
  };
  const handleLogoClick = () => {
    // Handle logo click logic
    console.log('Logo clicked!');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="logo-container flex justify-center mb-4">
          <div className="logo-text" onClick={handleLogoClick}>
            <span className="font-bold text-7xl text-blue-500">JUALIN</span>
          </div>
        </div>
        <form className="bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={userType}
                onChange={handleUserTypeChange}
              />
              <span className="text-sm">Register as admin</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;
