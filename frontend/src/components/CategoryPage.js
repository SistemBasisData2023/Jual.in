import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const CategoryPage = () => {
  // Sample data for categories
  const categories = ['Electronics', 'Clothing', 'Home Decor'];

  // Sample data for items
  const items = [
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

  // State to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  // Filter items based on the selected category
  const filteredItems = items.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to JUALIN E-commerce!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
          <div className="flex">
            {categories.map((category) => (
              <button
                key={category}
                className={`mr-4 py-2 px-4 rounded-md ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleCategorySelection(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Display Items - {selectedCategory}</h2>
            {filteredItems.length > 0 ? (
              <ul>
                {filteredItems.map((item) => (
                  <li key={item.id} className="mb-6">
                    <Link to={`/ItemDetails/${item.id}`}>
                      <div className="flex items-center">
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
                                    index < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-gray-500">({item.rating})</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <p className="text-gray-500 mt-2">{item.description}</p>
                  </li>
                ))}
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
