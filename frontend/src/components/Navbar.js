import React, { useState } from 'react';

const Navbar = ({ username, email, balance }) => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item);

    if (item === 'Home') {
      window.location.href = '/Home';
    } else if (item === 'Categories') {
      window.location.href = '/Categories';
    } else if (item === 'Check-out') {
      window.location.href = '/Check-out';
    } else if (item === 'History') {
      window.location.href = '/History';
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/Home';
  };

  const handleProfileClick = () => {
    window.location.href = '/Profile';
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
              className={`text-white font-bold text-lg ${activeItem === 'Home' ? 'underline' : ''} ${
                window.location.pathname === '/Home' ? 'text-black' : ''
              }`}
              onClick={() => handleItemClick('Home')}
            >
              Home
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === 'Categories' ? 'underline' : ''} ${
                window.location.pathname === '/Categories' ? 'text-black' : ''
              }`}
              onClick={() => handleItemClick('Categories')}
            >
              Categories
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === 'Check-out' ? 'underline' : ''} ${
                window.location.pathname === '/Check-out' ? 'text-black' : ''
              }`}
              onClick={() => handleItemClick('Check-out')}
            >
              Check-out
            </li>
            <li
              className={`text-white font-bold text-lg ${activeItem === 'History' ? 'underline' : ''} ${
                window.location.pathname === '/History' ? 'text-black' : ''
              }`}
              onClick={() => handleItemClick('History')}
            >
              History
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
          <div className="flex items-center" onClick={handleProfileClick}>
            <img
              className="w-12 h-12 rounded-full"
              src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              alt="Profile"
            />
          </div>
          <div className="text-white">
            <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
              {username}
            </span>
            <span className="text-gray-300 ml-2"></span>
            <br />
            <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
              {email}
            </span>
            <span className="text-gray-300 ml-2"></span>
            <br />
            <span className="font-bold text-lg" style={{ fontFamily: 'Jost Bold' }}>
              Balance: {balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </span>
            <span className="text-gray-300 ml-2"></span>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
