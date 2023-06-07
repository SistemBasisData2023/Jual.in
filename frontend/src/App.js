import React from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Checkout from './components/Checkout';
import AccountPage from './components/AccountPage';
import HistoryPage from './components/HistoryPage';
import ReviewPage from './components/ReviewPage';

export default function App() {
  return (
    <div>
      <ReviewPage/>
    </div>
  );
}