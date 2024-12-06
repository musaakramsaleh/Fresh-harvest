import React, { useState, useEffect } from "react";
import CommonText from "../../components/shared/CommonText";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products
        const productResponse = await fetch(
          "https://test-2-tan-chi.vercel.app/api/v1/products"
        );
        const productData = await productResponse.json();

        if (productData.success) {
          setProducts(productData.data);
          setFilteredProducts(productData.data);
        } else {
          throw new Error("Failed to fetch products");
        }

        // Fetch categories
        const categoryResponse = await fetch(
          "https://test-2-tan-chi.vercel.app/api/v1/category"
        );
        const categoryData = await categoryResponse.json();

        if (categoryData.success) {
          setCategories(categoryData.data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (err) {
        setError("Failed to load products or categories");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.categoryId === category)
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 mt-5">
      {/* Render category filter buttons */}
      <div className="mb-6 text-center">
        <CommonText
          small="Our Products"
          header="Our Fresh Products"
        ></CommonText>
        <p className="my-3">
          We pride ourselves on providing a wide variety of fresh and flavourful
          <br />
          fruits, vegetables, and ingredients.
        </p>
        {["All", ...categories.map((cat) => cat.id)].map(
          (categoryId, index) => {
            const categoryName =
              categoryId === "All"
                ? "All"
                : categories.find((cat) => cat.id === categoryId)?.categoryName;
            return (
              <button
                key={index}
                onClick={() => handleCategoryFilter(categoryId)}
                className={`px-5 py-3 font-semibold rounded-lg m-2 border ${
                  selectedCategory === categoryId
                    ? "bg-[#749B3F] text-white"
                    : "text-[#A6A6A6]"
                }`}
              >
                {categoryName}
              </button>
            );
          }
        )}
      </div>

      {/* Render products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 8).map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="w-full h-[350px] md:h-[360px] border p-3 rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={product.images[0] || "/default-image.png"}
                  alt={product.productName}
                  className="w-full h-[200px] sm:h-[180px] object-cover rounded-lg"
                />
                <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-4 text-center">
                  {product.productName}
                </h3>
                <p className="text-sm sm:text-base font-bold mt-2 text-center">
                  ${product.price}
                </p>
                <button className="w-full text-sm sm:text-base border-[#D9D9D9] hover:border-white text-[#212337] border-2 p-2 mt-4 rounded-lg bg-white hover:text-white hover:bg-[#FF6A1A] transition duration-300">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="flex justify-center">
        <Link to={"/product"}>
          <button className="border border-[#FF6A1A] text-[#FF6A1A] font-bold bg-transparent px-5 py-3 text-center max-w-[203px] hover:bg-[#FF6A1A] my-10 rounded-lg hover:text-white">
            See all Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
