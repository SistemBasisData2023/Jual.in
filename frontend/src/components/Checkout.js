import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartData = JSON.parse(sessionStorage.getItem('cartData') || '[]');

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemPromises = cartData.map((item) =>
          axios.get(`http://localhost:9000/items/${item.itemId}`)
        );
        const itemResponses = await Promise.all(itemPromises);
        const updatedCartItems = itemResponses.map((response, index) => {
          const itemData = response.data;
          const item = cartData[index];
          return { ...itemData, quantity: item.quantity };
        });
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      const total = cartItems.reduce((accumulator, item) => {
        const price = String(item.price || '0');
        const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
        return accumulator + numericPrice * item.quantity;
      }, 0);
      setTotalPrice(total);
      sessionStorage.setItem('totalPrice', total);
    };

    calculateTotalPrice();
  }, [cartItems]);


  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.availableQuantity), // Check against available quantity
            }
          : item
      )
    );
  };


  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const handleProceedToPayment = async () => {
    
    try {
      console.log(cartItems);
      const transactionData = {
        user_id: sessionStorage.getItem('user_id'), // Replace with actual user ID
        total_amount: totalPrice,
        items: cartItems.map((item) => ({
          item_id: item.item_id,
          quantity: item.quantity,
        })),
      };
      const {data} = await axios.post('http://localhost:9000/transactions/create', transactionData);
      console.log(data);
      console.log(transactionData.id);
      sessionStorage.setItem('transactionId', data.transaction_id);
      window.location.href = `/Payment/${data.transaction_id}`;

      // Optionally, you can perform additional actions after the transaction is created
      // For example, clearing the cart or navigating to a success page
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div>
      
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Items in Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6">
              <div className="mr-4">
                <img className="w-32 h-32 rounded-md" src={item.image_url} alt="Product" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-500">Price: {item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="text-blue-500 font-bold border border-blue-500 px-2 py-1 rounded"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg mx-2">{item.quantity}</span>
                  <button
                    className="text-blue-500 font-bold border border-blue-500 px-2 py-1 rounded"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">Rp {totalPrice.toLocaleString()}</p>
          </div>

          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
