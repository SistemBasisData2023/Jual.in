import React from 'react';

const ItemDetails = ({ item }) => {
  const imageUrl = item.image ? URL.createObjectURL(item.image) : null;

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Item Details</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <p className="text-lg mb-2">Price: {item.price}</p>
          <p className="text-lg mb-2">Description: {item.description}</p>
          <p className="text-lg mb-2">Quantity: {item.quantity}</p>
          {imageUrl && (
            <img src={imageUrl} alt="Item" className="mb-4 rounded-md" />
          )}
          <p className="text-lg mb-2">Category: {item.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
