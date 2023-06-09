import React from 'react';

const Home = () => {
  const displayItems = [
    {
      id: 1,
      name: 'Sample Product 1',
      price: '$19.99',
      category: 'Electronics',
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: '$29.99',
      category: 'Clothing',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      name: 'Sample Product 3',
      price: '$9.99',
      category: 'Home Decor',
      rating: 4.2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  const navigateToItemDetails = (itemId) => {
    window.location.href = `/ItemDetails/${itemId}`;
  };

  const navigateToAddItem = () => {
    window.location.href = '/AddItem';
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to JUALIN E-commerce!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Display Items</h2>
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-6"
              onClick={() => navigateToItemDetails(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mr-4">
                <img
                  className="w-32 h-32 rounded-md"
                  src="https://example.com/sample-product-image.jpg"
                  alt="Product"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-500">Price: {item.price}</p>
                <p className="text-gray-500">Category: {item.category}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 fill-current ${
                          index < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2C5.639 2 2 5.639 2 10c0 4.362 3.639 8 8 8 4.362 0 8-3.638 8-8 0-4.361-3.638-8-8-8zm0 14.723l-2.765-1.553C6.54 14.02 4.5 11.43 4.5 8.75c0-.27.023-.53.068-.781L1.277 5.235l1.932-.633 2.02-1.477c.207-.15.481-.185.719-.082l2.482 1.019.749-1.876C10.838.71 11.228.5 11.63.5c.39 0 .78.208.98.589l.717 1.876 2.482-1.019c.238-.103.512-.068.719.082l2.02 1.477 1.932.633-2.79 1.752c.053.253.08.514.08.781 0 2.68-2.04 5.27-5.468 5.938L10 16.723z"
                        />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-500">({item.rating})</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
          onClick={navigateToAddItem}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14 10a1 1 0 01-1 1H11v2a1 1 0 01-2 0v-2H7a1 1 0 110-2h2V7a1 1 0 112 0v2h2a1 1 0 011 1zm4-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2zM4 2a4 4 0 00-4 4v10a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
