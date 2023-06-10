import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ItemDetails = ({ item }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemResponse = await axios.get(`http://localhost:9000/items/${sessionStorage.getItem('itemId')}`);
        setItemDetails(itemResponse.data);
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

  const handleAddToCart = () => {
    // Get the current cart data from session storage
    const cartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

    // Add the current item's data to the cart data
    const newItem = { itemId: sessionStorage.getItem('itemId'), quantity };
    cartData.push(newItem);

    // Update the session storage with the updated cart data
    sessionStorage.setItem('cartData', JSON.stringify(cartData));

    console.log('Item added to cart');
  };

  const increaseQuantity = () => {
    if (quantity < itemDetails.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
              <p className="text-lg mb-2">Stock: {itemDetails.quantity}</p>
              <p className="text-lg mb-2">Category: {itemDetails.category_name}</p>

              <div className="flex items-center space-x-4 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center space-x-2"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1} // Disable the button when quantity is 1
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{quantity}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center space-x-2"
                  onClick={increaseQuantity}
                  disabled={quantity === itemDetails.quantity} // Disable the button when quantity reaches the item's stock
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mt-4 flex items-center space-x-2"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Add to Cart</span>
              </button>
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
                className={`px-4 py-2 rounded-lg border ${
                  selectedRating === rating ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => handleRatingFilter(rating)}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`h-4 w-4 fill-current ${
                      index < rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </button>
            ))}
          </div>

          {reviews.length > 0 ? (
            <div className="mt-6">
              {reviews.map((review) => (
                <div key={review.review_id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <p className="text-lg font-bold">{review.username}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`h-4 w-4 fill-current ${
                          index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg mt-2">"{review.comment}"</p>
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
