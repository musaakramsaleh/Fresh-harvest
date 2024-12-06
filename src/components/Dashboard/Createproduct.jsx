import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Provider/AuthProvider";
import CommonText from "../shared/CommonText";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(""); // Will hold the selected categoryId
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api-fresh-harvest.code-commando.com/api/v1/category"
        );
        const data = await response.json();

        if (data.success) {
          setCategoryList(data.data); // Populate category list with response data
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (err) {
        setError("Unable to load categories. Please try again later.");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Handle image upload
  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0]; // Get only one file
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=82a00a069bd277451137960db92b44b6",
        formData
      );

      if (response.data.success) {
        setImage(response.data.data.url); // Save uploaded image URL
      } else {
        alert("Error uploading image: " + response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = authToken; // Replace with your actual token
    const newProduct = {
      productName,
      description,
      price: parseFloat(price), // Ensure price is a number
      stock: parseInt(stock, 10), // Ensure stock is an integer
      images: [image], // Ensure images is an array
      categoryId: category, // Ensure categoryId is valid
    };

    console.log("Request Payload:", newProduct);

    try {
      const response = await axios.post(
        "https://api-fresh-harvest.code-commando.com/api/v1/products",
        newProduct,
        {
          headers: {
            Authorization: token, // Add 'Bearer' prefix
          },
        }
      );

      alert("Product created successfully");
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error response:", error.response);
      alert(
        "There was an error creating the product: " +
          error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-5">
        <CommonText small="Product" header="Create New Product"></CommonText>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {loading && <p>Uploading image...</p>}
        </div>
        {image && (
          <div>
            <h3 className="mt-2">Uploaded Image:</h3>
            <img
              src={image}
              alt="Uploaded"
              className="w-24 h-24 object-cover mt-2"
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FF6A1A] text-white rounded hover:bg-[#FF6A1A] hover:opacity-70"
          >
            Create Product
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateProduct;
