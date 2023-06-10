import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:9000/items/category/all');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelection = async (category) => {
    setSelectedCategory(category);
    fetchFilteredItems(category);
  };

  const fetchFilteredItems = async (category) => {
    try {
      const response = await fetch(`http://localhost:9000/items/category/:name?=${category}`);
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (itemId) => {
    sessionStorage.setItem('itemId', itemId);
    
    // Handle item click here, e.g., navigate to item details page programmatically
    console.log(`Item clicked: ${itemId}`);
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to JUALIN E-commerce!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
          <div className="flex">
            {categories.map((category) => (
              <button
                key={category.category_id}
                className={`mr-4 py-2 px-4 rounded-md ${
                  selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            
                }`}
                
                onClick={() => handleCategorySelection(category.name)}
                
              >
              
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Display Items - {selectedCategory}</h2>
            {filteredItems.length > 0 ? (
              <ul>
                {filteredItems.length > 0 ? (
                <ul>
                  {filteredItems.map((item) => (
                    <li key={item.item_id} className="mb-6">
                      <div className="flex items-center" onClick={() => handleItemClick(item.item_id)}>
                        <div className="mr-4">
                          <img className="w-32 h-32 rounded-md" src={item.image_url} alt="Product" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <p className="text-gray-500">Price: {item.price}</p>
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
                      <p className="text-gray-500 mt-2">{item.description}</p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No items found in this category.</p>
            )}
              </ul>
            ) : (
              <p>No items found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
