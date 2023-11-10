import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
      <div className="flex justify-center">
              <img
                src={product.images.thumbnail}
                alt={`Thumbnail for ${product.general.productName}`}
                className="w-full h-48 object-cover rounded"
              />
            </div>
        <h2 className="text-2xl font-bold mb-4">{product.general.productName}</h2>
        <p className="text-gray-700 mb-4"><strong>Description:</strong>{product.general.description}</p>
        <p className="text-gray-700 mb-4"><strong>Price:</strong>{product.data.price}</p>
        <p className="text-gray-700 mb-4"><strong>Quantity:</strong>{product.data.quantity}</p>


        {/* Add more details as needed */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const optionData = JSON.parse(localStorage.getItem('productFormData')) || [];
    setProductDetails(optionData);
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-md shadow-lg">
        <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/addproduct"
      >
        Go to Add Product
      </Link>
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productDetails?.map((option, index) => (
          <div
            key={option.id}
            className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 flex flex-col justify-between"
          >
            <div className="flex justify-center">
              <img
                src={option.images.thumbnail}
                alt={`Thumbnail for ${option.general.productName}`}
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{option.general.productName}</h3>
              <p className="text-gray-700 mb-4">{option.general.description}</p>
              {/* Add more details as needed */}
            </div>
            
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={() => handleViewDetails(option)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Show Product Details Modal */}
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default ProductList;
