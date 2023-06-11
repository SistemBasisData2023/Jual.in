import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const accountBalance = 1000; // Dummy account balance
  const cartItems = JSON.parse(sessionStorage.getItem('cartData') || '[]');
  console.log(cartItems);
  const searchParams = new URLSearchParams(window.location.search);
  const totalPrice = sessionStorage.getItem('totalPrice') || searchParams.get('totalPrice');
  const [transactionData, setTransactionData] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = () => {
    // Make an API request to fetch the user data from the backend
    axios.get(`http://localhost:9000/users/singleId/${sessionStorage.getItem("user_id")}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserData();
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/transactions/data/${sessionStorage.getItem('transactionId')}`);
        setTransactionData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionData();
  }, []);

  const handlePayment = () => {
    console.log(totalPrice);
    console.log(userData.balance);
    if (totalPrice > userData.balance) {
      console.log('Insufficient balance. Payment cannot be continued.');
      return;
    }

    // // Make a POST request to perform the payment transaction
    // const userId = sessionStorage.getItem('user_id');
    axios.post(`http://localhost:9000/users/transactions/${userData.user_id}`, { totalPrice })
      .then((response) => {
        console.log(response.data.message);
        window.location.href = '/History';
        // Process the response as needed
      })
      .catch((error) => {
        console.log(error);
        // Handle the error as needed
      });
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Payment</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>

          {/* <div className="mb-6">
            <p className="font-bold mb-2">Account Balance: {accountBalance}</p>
          </div> */}

          {userData && (
            <div className="text-grey">
              <div className="mb-6">
                <p className="font-bold mb-2">Account Balance: Rp{userData.balance}</p>
              </div>
            </div>
          )}

          {transactionData.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mt-6">Transaction Details</h3>
              {transactionData.map((transaction) => (
                <div key={transaction.transaction_id} className="flex items-center mt-4">
                  <div className="mr-4">
                    <img className="w-28 h-28 rounded-md" src={transaction.items.image_url} alt="Product" />
                  </div>
                  <div>
                    <p className="text-md font-bold">Name: {transaction.items.name}</p>
                    <p className="text-gray-700">Price: {transaction.items.price}</p>
                    
                    <p className="text-gray-700">Date/Time: {transaction.timestamp}</p>
                    <p className="text-gray-700">Current Date/Time: {new Date().toLocaleString()}</p>
                    <div>
                      {/* <h3 className="text-lg font-bold mt-4">Items:</h3> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          


          {/* <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Items to Buy</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <div className="mr-4">
                  <img className="w-10 h-10 rounded-md" src={item.image_url} alt="Product" />
                </div>
                <div>
                  <p className="text-md font-bold">Name: {item.name}</p>
                  <p className="text-gray-500">Price: {item.price}</p>
                </div>
              </div>
            ))}
          </div> */}

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
