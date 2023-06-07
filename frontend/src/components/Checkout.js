import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sample Product 1',
      price: 'Rp 19,000',
      quantity: 2,
      imageUrl: 'https://example.com/sample-product-image1.jpg',
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: 'Rp 29,000',
      quantity: 1,
      imageUrl: 'https://example.com/sample-product-image2.jpg',
    },
    {
      id: 3,
      name: 'Sample Product 3',
      price: 'Rp 9,000',
      quantity: 3,
      imageUrl: 'https://example.com/sample-product-image3.jpg',
    },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      // Fetch the real price information from the server
      // Replace this code with your actual API or database call
      const fetchPricesFromServer = async () => {
        try {
          const response = await fetch('https://api.example.com/prices');
          const data = await response.json();

          // Map the fetched prices to the cart items
          const updatedCartItems = cartItems.map((item) => {
            const priceData = data.find((priceItem) => priceItem.id === item.id);
            const price = priceData ? priceData.price : item.price;
            return { ...item, price };
          });

          setCartItems(updatedCartItems);
        } catch (error) {
          console.error('Error fetching prices:', error);
        }
      };

      fetchPricesFromServer();
    };

    calculateTotalPrice();
  }, []); // Empty dependency array to only run once on component mount

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (accumulator, item) =>
          accumulator + parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <div>
      <Navbar username="JohnDoe" email="johndoe@example.com" balance={100000} />

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Items in Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6">
              <div className="mr-4">
                <img className="w-32 h-32 rounded-md" src={item.imageUrl} alt="Product" />
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

          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
