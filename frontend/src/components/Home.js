import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to JUALIN E-commerce!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Display Items</h2>
          {items.map((item) => (
            <div
              key={item.item_id}
              className="flex items-center mb-6"
              onClick={() => navigateToItemDetails(item.item_id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mr-4">
                <img className="w-32 h-32 rounded-md" src={item.image_url} alt="Product" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-500">Price: {item.price}</p>
                <p className="text-gray-500">Category: {item.category_name}</p>
                <div className="flex items-center mt-2">
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
          ))}
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
