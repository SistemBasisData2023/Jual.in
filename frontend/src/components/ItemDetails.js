import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemDetails = ({ item }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemResponse = await axios.get(`http://localhost:9000/items/${sessionStorage.getItem('itemId')}`);
        
        setItemDetails(itemResponse.data);
        console.log(itemResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItemDetails();
  }, [item.id]);

  // const imageUrl = itemDetails?.image_url ? URL.createObjectURL(itemDetails.image_url) : null;

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Item Details</h1>

        {itemDetails ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <img src={itemDetails.image_url} alt="Item" className="mb-4 rounded-md" />
            <h2 className="text-xl font-bold mb-2">{itemDetails.name}</h2>
            <p className="text-lg mb-2">Price: {itemDetails.price}</p>
            <p className="text-lg mb-2">Description: {itemDetails.description}</p>
            <p className="text-lg mb-2">Quantity: {itemDetails.quantity}</p>
            {/* {imageUrl && ( */}
            
            {/* )} */}
            <p className="text-lg mb-2">Category: {itemDetails.category_name}</p>
          </div>
        ) : (
          <p>Loading item details...</p>
        )}
        
      {/* Createe a system do display rating for that items */}

      </div>
    </div>
  );
};

export default ItemDetails;
