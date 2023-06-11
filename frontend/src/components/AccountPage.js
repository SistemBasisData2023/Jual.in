import React, { useState } from 'react';

import axios from 'axios';


const AccountPage = () => {
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  


  const handleTopUp = async () => {
    try {
      const response = await axios.patch(`http://localhost:9000/users/topup/${sessionStorage.getItem("user_id")}`, {
        amount: topUpAmount,
      });
      const updatedBalance = response.data.balance;
      setBalance(updatedBalance);
      setTopUpAmount(0);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to top up balance');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      try {
        const response = await axios.patch(`http://localhost:9000/users/changePassword/${sessionStorage.getItem("user_id")}`, {
          currentPassword: password,
          newPassword: newPassword,
        });
        console.log(response.data); // Optional: Handle the response if needed
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to change password');
      }
    }
  };
  
  
  return (
    <div>

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Account Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Balance</h2>
          {/* <p className="text-gray-500">Current Balance: {balance}</p> */}
          <div className="mb-4">
            <label htmlFor="top-up-amount" className="block text-gray-700 font-bold mb-2">
              Top-up Amount
            </label>
            <input
              type="number"
              id="top-up-amount"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(parseInt(e.target.value))}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleTopUp}
          >
            Top-up Balance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 font-bold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="border border-gray-400 rounded w-full py-2 px-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
