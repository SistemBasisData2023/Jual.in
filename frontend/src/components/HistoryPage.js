import React, { useState } from 'react';
import Navbar from './Navbar';

const HistoryPage = () => {
  const orderHistory = [
    {
      id: 1,
      items: [
        {
          name: 'Sample Product 1',
          price: 'Rp 19,000',
          quantity: 2,
          imageUrl: 'https://example.com/sample-product-image1.jpg',
        },
        {
          name: 'Sample Product 2',
          price: 'Rp 29,000',
          quantity: 1,
          imageUrl: 'https://example.com/sample-product-image2.jpg',
        },
      ],
      date: '2023-05-28',
    },
    // Add more transactions here
  ];

  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewExpand = (orderId) => {
    setExpandedReviewId(orderId);
    setReviewText('');
    setRating(1);
    setReviewSubmitted(false);
  };

  const handleReviewSubmit = (orderId) => {
    const review = {
      orderId,
      text: reviewText,
      rating,
    };
    // Handle the review submission using the review data
    console.log('Submitted Review:', review);
    // Clear the review form and set the reviewSubmitted flag
    setReviewText('');
    setRating(1);
    setReviewSubmitted(true);
  };

  return (
    <div>
      <Navbar username="JohnDoe" email="johndoe@example.com" balance={100000} />

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Order History</h1>

        {orderHistory.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="text-gray-500">Order Date: {order.date}</p>
            {order.items.map((item) => (
              <div key={item.name} className="flex items-center mb-6">
                <div className="mr-4">
                  <img
                    className="w-32 h-32 rounded-md"
                    src={item.imageUrl}
                    alt="Product"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-500">Price: {item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            {expandedReviewId === order.id ? (
              reviewSubmitted ? (
                <p className="text-green-500">Review submitted!</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReviewSubmit(order.id);
                  }}
                >
                  <div className="flex items-center mb-4">
                    <label htmlFor={`review-${order.id}`} className="mr-2">
                      Review:
                    </label>
                    <textarea
                      id={`review-${order.id}`}
                      className="border rounded-md p-2"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor={`rating-${order.id}`} className="mr-2">
                      Rating:
                    </label>
                    <select
                      id={`rating-${order.id}`}
                      className="border rounded-md p-2"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Submit Review
                  </button>
                </form>
              )
            ) : (
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleReviewExpand(order.id)}
              >
                Add a Review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
