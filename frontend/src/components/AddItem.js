import React, { useState } from 'react';

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const existingCategories = ['Electronics', 'Clothing', 'Home Decor'];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new item object
    const newItem = {
      id: Date.now(),
      name,
      price,
      description,
      quantity,
      image,
      category,
    };

    // TODO: Add code to update the displayItems list or send the new item to an API

    // Clear the form fields
    setName('');
    setPrice('');
    setDescription('');
    setQuantity('');
    setImage(null);
    setCategory('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Add Item</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="text-lg font-bold mb-2">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded-md py-2 px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="text-lg font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                className="w-full border rounded-md py-2 px-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="text-lg font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border rounded-md py-2 px-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="quantity" className="text-lg font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full border rounded-md py-2 px-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="image" className="text-lg font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="w-full border rounded-md py-2 px-3"
                onChange={handleImageUpload}
                accept="image/*"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="text-lg font-bold mb-2">
                Category
              </label>
              <select
                id="category"
                className="w-full border rounded-md py-2 px-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {existingCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
