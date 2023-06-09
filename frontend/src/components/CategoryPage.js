import React, { useState } from 'react';
import Navbar from './Navbar';

const CategoryPage = () => {
  // Sample data for categories
  const categories = ['Electronics', 'Clothing', 'Home Decor'];

  // State to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
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
            {/* Replace this section with your logic to filter and display items based on the selected category */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
