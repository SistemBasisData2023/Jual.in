import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const { pathname } = window.location;
    setActiveItem(pathname);
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Make an API request to fetch the user data from the backend
    axios
      .get(`http://localhost:9000/users/singleId/${sessionStorage.getItem('user_id')}`)
      .then((response) => {
        const formattedBalance = formatPriceWithDots(response.data.balance);
        setUserData({ ...response.data, formattedBalance });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogoClick = () => {
    window.location.href = '/Home';
  };

  const handleProfileClick = () => {
    window.location.href = '/Account';
  };

  const handleCategoryClick = () => {
    window.location.href = '/Category';
  };

  const handleCheckOutClick = () => {
    window.location.href = '/Checkout';
  };

  const handleHistoryClick = () => {
    window.location.href = '/History';
  };

  const formatPriceWithDots = (price) => {
    return price.toLocaleString('en-ID');
  };

  const handleLogout = () => {
    const logoutConfirmed = window.confirm('Are you sure you want to log out?');

    if (logoutConfirmed) {
      // Perform any logout logic or clearing of session data here
      // For example, you can clear session storage and redirect to the login page
      sessionStorage.clear();
      window.location.href = '/LoginPage';
    }
  };

  return (
    <nav className="bg-blue-500 py-4" style={{ backgroundColor: '#3D8FD1' }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center text-white ml-6" onClick={handleLogoClick}>
            <span className="font-bold text-5xl mr-4">JUALIN</span>
          </div>
          <ul className="flex space-x-8 ml-8">
            <li
              className={`text-white font-bold text-lg ${activeItem === '/Home' ? 'underline' : ''}`}
              onClick={handleLogoClick}
            >
              <a href="/Home">Home</a>
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === '/Categories' ? 'underline' : ''}`}
              onClick={handleCategoryClick}
            >
              <a href="/Categories">Category</a>
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === '/Check-out' ? 'underline' : ''}`}
              onClick={handleCheckOutClick}
            >
              <a href="/Check-out">Check-out</a>
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === '/History' ? 'underline' : ''}`}
              onClick={handleHistoryClick}
            >
              <a href="/History">History</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {userData && (
            <div className="flex items-center" onClick={handleProfileClick}>
              <a href="/Account">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                  alt="Profile"
                />
              </a>
            </div>
          )}
          {userData && (
            <div className="text-white text-sm">
              <span className="font-bold">{userData.username}</span>
              <br />
              <span className="font-bold">{userData.email}</span>
              <br />
              <span className="font-bold">Rp {userData.formattedBalance}</span>
            </div>
          )}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
