import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonText from "../shared/CommonText";
import LoadingSpinner from "../shared/LoadingSpinner";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-fresh-harvest.code-commando.com/api/v1/products"
        );
        if (response.data.success) {
          setProducts(response.data.data); // Set products from API response
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        setError("Unable to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-10 text-center">
        <CommonText small="Admin" header="All products"></CommonText>
      </div>
      <div className="overflow-x-auto">
        {/* Ensure that the table can exceed the width */}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Category ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.categoryId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
