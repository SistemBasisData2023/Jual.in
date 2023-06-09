import React from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Checkout from './components/Checkout';
import AccountPage from './components/AccountPage';
import HistoryPage from './components/HistoryPage';
import RegisterPage from './components/RegisterPage';
import CategoryPage from './components/CategoryPage';
import ItemDetails from './components/ItemDetails';
import AddItem from './components/AddItem';
import Payment from './components/Payment';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


export default function App() {
  const displayItems = [
    {
      id: 1,
      name: 'Sample Product 1',
      price: '$19.99',
      category: 'Electronics',
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: '$29.99',
      category: 'Clothing',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      name: 'Sample Product 3',
      price: '$9.99',
      category: 'Home Decor',
      rating: 4.2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  const item = {
    id: 1,
    name: 'Example Item',
    price: '$9.99',
    description: 'This is an example item.',
    quantity: 10,
    image: null,
    category: 'Electronics',
  };

  function NavbarWrapper() {
    const location = useLocation();
  
    const showNavbar = !['/LoginPage', '/RegisterPage', "/"].includes(location.pathname);
  
    return showNavbar ? <Navbar username="JohnDoe" email="johndoe@example.com" balance={100000} /> : null;
  }


  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/Home" element={<Home items={displayItems} />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/History" element={<HistoryPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Category" element={<CategoryPage />} />
        <Route path="/ItemDetails/:id" element={<ItemDetails item={item} />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/Payment/:transaction_id" element={<Payment />} />
      </Routes>
    </Router>
  );
}