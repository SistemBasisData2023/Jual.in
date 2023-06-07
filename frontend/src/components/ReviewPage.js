import React from 'react';
import Navbar from './Navbar';

const ReviewPage = () => {
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

  const handleReviewSubmit = (orderId, itemId, review) => {
    // Handle the review submission for the given orderId, itemId, and review data
    console.log(`Submit review for Order ID ${orderId}, Item ID ${itemId}: ${review}`);
  };

  return (
    <div>
      <Navbar username="JohnDoe" email="johndoe@example.com" balance={100000} />

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Review Products</h1>

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
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
