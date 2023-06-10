import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from '@material-tailwind/react';
import Navbar from './Navbar';

const ItemDetails = ({ item }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviews, setReviews] = useState([]);

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
  }, []);

  const fetchReviews = async (itemId, rating) => {
    let url = `http://localhost:9000/reviews/${sessionStorage.getItem('itemId')}`;

    if (rating) {
      url += `/${rating}`;
    }

    try {
      const reviewsResponse = await axios.get(url);
      setReviews(reviewsResponse.data);
      console.log(reviewsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
    fetchReviews(item.id, rating);
  };

  useEffect(() => {
    fetchReviews(item.id, selectedRating);
  }, [item.id, selectedRating]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">Item Details</h1>

          {itemDetails ? (
            <div>
              <img src={itemDetails.image_url} alt="Item" className="mb-4 rounded-md shadow-lg" />
              <h2 className="text-xl font-bold mb-2">{itemDetails.name}</h2>
              <p className="text-lg mb-2">Price: Rp{formatPrice(itemDetails.price)},00</p>
              <p className="text-lg mb-2">Description: {itemDetails.description}</p>
              <p className="text-lg mb-2">Quantity: {itemDetails.quantity}</p>
              <p className="text-lg mb-2">Category: {itemDetails.category_name}</p>
            </div>
          ) : (
            <p>Loading item details...</p>
          )}

          <div className="flex items-center space-x-2 mt-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedRating === null ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => handleRatingFilter(null)}
            >
              All
            </button>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={`px-4 py-2 rounded-lg ${
                  selectedRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => handleRatingFilter(rating)}
              >
                {rating} Star
              </button>
            ))}
          </div>

          {reviews.length > 0 ? (
            <div className="mt-6">
              {reviews.map((review) => (
                <div key={review.review_id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <p className="text-lg font-bold">Username: {review.username}</p>
                  <Rating value={review.rating} color="yellow" size="regular" />
                  <p className="text-lg mt-2">Comment: {review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
