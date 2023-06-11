import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:9000/items/all');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const navigateToItemDetails = (itemId) => {
    sessionStorage.setItem('itemId', itemId);
    window.location.href = `/ItemDetails/${itemId}`;
  };

  const navigateToAddItem = () => {
    window.location.href = '/AddItem';
  };

  const formatPrice = (price) => {
    const parts = price.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItems = () => {
    const itemsPerRow = 5;
    const gap = 10; // Gap between item containers (in pixels)
    const containerWidth = `calc(${100 / itemsPerRow}% - ${gap * 2}px)`;
    const containerStyle = {
      width: containerWidth,
      marginRight: `${gap}px`,
      marginLeft: `${gap}px`,
    };

    const itemContainerStyle = {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer'
    };

    const itemImageStyle = {
      width: '200px',
      height: '200px',
      marginBottom: '10px',
      borderRadius: '4px',
    };

    const itemNameStyle = {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '6px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const itemPriceStyle = {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#888',
      marginBottom: '6px',
    };

    const itemRatingStyle = {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#888',
    };

    const rows = [];

    for (let i = 0; i < filteredItems.length; i += itemsPerRow) {
      const rowItems = filteredItems.slice(i, i + itemsPerRow);

      const row = (
        <div key={i} className="flex">
          {rowItems.map((item) => (
            <div
              key={item.item_id}
              className="flex flex-col items-center mb-6"
              onClick={() => navigateToItemDetails(item.item_id)}
              style={containerStyle}
            >
              <div style={itemContainerStyle}>
                <img className="w-32 h-32 rounded-md" src={item.image_url} alt="Product" style={itemImageStyle} />
                <div>
                  <h3 className="text-lg font-bold" style={itemNameStyle}>
                    {item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}
                  </h3>
                  <p className="text-gray-500" style={itemPriceStyle}>
                    Rp{formatPrice(item.price)}
                  </p>
                  <div className="flex items-center mt-2" style={itemRatingStyle}>
                    <span className="text-yellow-500 flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={`h-4 w-4 fill-current ${
                            index < Math.floor(item.average_rating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-500">({item.average_rating})</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

      rows.push(row);
    }

    return rows;
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to JUALIN E-commerce!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Display Items</h2>
          
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {renderItems()}
        </div>

        <button
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
          onClick={navigateToAddItem}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14 10a1 1 0 01-1 1H11v2a1 1 0 01-2 0v-2H7a1 1 0 110-2h2V7a1 1 0 112 0v2h2a1 1 0 011 1zm4-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2zM4 2a4 4 0 00-4 4v10a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;