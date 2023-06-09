import React, { useState } from 'react';
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
                  <li key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Rating: {item.rating}</p>
                    <p>{item.description}</p>
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
