import React from 'react';

const Payment = () => {
  const accountBalance = 1000; // Dummy account balance
  const cartItems = JSON.parse(sessionStorage.getItem('cartData') || '[]');
  const searchParams = new URLSearchParams(window.location.search);
  const totalPrice = searchParams.get('totalPrice');

  const handlePayment = () => {
    if (totalPrice > accountBalance) {
      console.log('Insufficient balance. Payment cannot be continued.');
      return;
    }

    // Perform payment processing logic here
    // You can use the cartItems and accountBalance variables for processing the payment
    console.log('Payment processed successfully!');
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Payment</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>

          <div className="mb-6">
            <p className="font-bold mb-2">Account Balance: {accountBalance}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Items to Buy</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <div className="mr-4">
                  <img className="w-10 h-10 rounded-md" src={item.image_url} alt="Product" />
                </div>
                <div>
                  <p className="text-md font-bold">{item.name}</p>
                  <p className="text-gray-500">Price: {item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total Price:</p>
            <p className="text-lg font-bold">Rp {totalPrice}</p>
          </div>

          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6"
            onClick={handlePayment}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
