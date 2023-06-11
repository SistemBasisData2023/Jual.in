import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:9000/users/login', {
        username: username,
        password: password,
        role: isAdmin ? 'admin' : 'user',
      })
      .then((response) => {
        sessionStorage.setItem('user_id', response.data.user_id);
        sessionStorage.setItem('role', response.data.role);
        console.log(response);
        console.log(response.data.user_id);
        window.location.href = '/Home';
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Login failed. Please check your credentials.');
      });
  };

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleRegister = () => {
    window.location.href = '/RegisterPage';
  };

  const handleLogoClick = () => {
    console.log('Logo clicked!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="logo-container flex justify-center mb-4">
          <div className="logo-text" onClick={handleLogoClick}>
            <span className="font-bold text-7xl text-blue-500">JUALIN</span>
          </div>
        </div>
        <form className="bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={isAdmin}
                onChange={handleCheckboxChange}
              />
              <span className="text-sm">Login as admin</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
          <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;