import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonText from "../shared/CommonText";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth(); // Get the authentication token

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

  // Handle product delete with confirmation from SweetAlert2
  const handleDelete = async (productId) => {
    // SweetAlert2 confirmation prompt
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://api-fresh-harvest.code-commando.com/api/v1/products/${productId}`,
          {
            headers: {
              Authorization: authToken, // Add Authorization header with the token
            },
          }
        );
        if (response.data.success) {
          // Optimistic UI update - remove the product from the state immediately
          setProducts(products.filter((product) => product.id !== productId));
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "Failed to delete product. Please try again.",
            "error"
          );
        }
      } catch (err) {
        console.error("Error deleting product", err);
        Swal.fire(
          "Error!",
          "Failed to delete product. Please try again.",
          "error"
        );
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-10 text-center">
        <CommonText small="Admin" header="All products"></CommonText>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Category ID</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
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
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProduct;
