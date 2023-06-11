import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    setActiveItem(pathname);
    fetchUserData();
  }, [location]);

  const fetchUserData = () => {
    // Make an API request to fetch the user data from the backend
    axios.get(`http://localhost:9000/users/singleId/${sessionStorage.getItem("user_id")}`)
      .then((response) => {
        setUserData(response.data);
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

  return (
    <nav className="bg-blue-500 py-4" style={{ backgroundColor: '#3D8FD1' }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center text-white ml-6" onClick={handleLogoClick}>
            <span className="font-bold text-5xl mr-4">JUALIN</span>
          </div>
          <ul className="flex space-x-8 ml-8">
            <li className={`text-white font-bold text-lg ${activeItem === '/Home' ? 'underline' : ''}`} onClick={handleLogoClick}>
              <Link to="/Home">Home</Link>
            </li>
            <li className={`text-white font-bold text-lg ${activeItem === '/Categories' ? 'underline' : ''}`} onClick={handleCategoryClick}>
              <Link to="/Categories">Category</Link>
            </li>
            <li className={`text-white font-bold text-lg ${activeItem === '/Check-out' ? 'underline' : ''}`} onClick={handleCheckOutClick}>
              <Link to="/Check-out">Check-out</Link>
            </li>
            <li className={`text-white font-bold text-lg ${activeItem === '/History' ? 'underline' : ''}`} onClick={handleHistoryClick}>
              <Link to="/History">History</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="flex items-center ml-4">
            <input
              className="w-96 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {userData && (
            <div className="flex items-center" onClick={handleProfileClick}>
              <Link to="/Account">
                <img
                  className="w-12 h-12 rounded-full"
                  src={'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
                  alt="Profile"
                />
              </Link>
            </div>
          )}
          {userData && (
            <div className="text-white">
              <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
                {userData.username}
              </span>
              <span className="text-gray-300 ml-2"></span>
              <br />
              <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
                {userData.email}
              </span>
              <span className="text-gray-300 ml-2"></span>
              <br />
              <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
                Rp{userData.balance}
              </span>
              <span className="text-gray-300 ml-2"></span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
