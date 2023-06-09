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

  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleReviewSubmit = (orderId, itemId, review) => {
    // Simulating submission by adding the review to the submittedReviews state
    const submittedReview = {
      orderId,
      itemId,
      review,
    };
    setSubmittedReviews([...submittedReviews, submittedReview]);
    console.log(`Submit review for Order ID ${orderId}, Item ID ${itemId}: ${review}`);
  };

  return (
    <div>

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Review Products</h1>

        {orderHistory.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="text-gray-500">Order Date: {order.date}</p>
            {order.items.map((item) => {
              const isReviewSubmitted = submittedReviews.some(
                (review) => review.orderId === order.id && review.itemId === item.name
              );

              return (
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
                    {!isReviewSubmitted ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const review = e.target.elements.review.value;
                          handleReviewSubmit(order.id, item.name, review);
                        }}
                      >
                        <div className="flex items-center">
                          <textarea
                            className="border rounded-md p-2"
                            name="review"
                            placeholder="Write your review..."
                            required
                          ></textarea>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded ml-4"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-green-500">Review submitted successfully!</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
