import React, { useState, useEffect } from "react";
import CommonText from "../../../components/shared/CommonText";
import img from "../../../assets/Logo.png";
import img2 from "../../../assets/Group 2.png";

const Aboutus = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "https://api-fresh-harvest.code-commando.com/api/v1/products/6751818c1cdb919fe028cf14"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data?.data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-6 mt-5 flex flex-col md:flex-row items-center justify-between relative">
      {/* Main Image Section */}
      <div className="relative flex-shrink-0 mb-8 md:mb-0">
        <img
          src="https://i.ibb.co/CMCJQsS/Image-3.png"
          alt="About Us"
          className="w-full max-w-[600px] mx-auto md:max-w-[600px]"
        />

        {/* Overlay Logos */}
        <div className="absolute top-[220px] md:top-[340px] right-[50px] md:right-[100px] w-[110px] h-[30px] flex justify-center items-center md:w-[180px] md:h-[45px] bg-white">
          <img
            src={img}
            alt="Logo"
            className="w-[100px] h-[25px] md:w-[154px] md:h-[29px]"
          />
        </div>
        <div className="absolute top-[240px] md:top-[350px] right-[10px] md:right-[20px]">
          <img src={img2} alt="Logo" className="w-[50px] md:w-[80px]" />
        </div>

        {/* Product Card */}
        {loading ? (
          <div className="absolute top-[420px] right-16 text-center text-gray-500">
            Loading...
          </div>
        ) : error ? (
          <div className="absolute top-[420px] right-16 text-center text-red-500">
            {error}
          </div>
        ) : (
          product && (
            <div className="absolute top-[280px] md:top-[420px] right-16 shadow-lg bg-white border rounded-lg p-3 w-[80px] md:w-[150px]">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/default-image.png"
                }
                alt={product.productName}
                className="w-[75px] h-[61px] md:w-full md:h-[110px] object-cover rounded-lg mx-auto"
              />
              <h3 className="md:text-[12px] text-[7px] font-bold mt-2 text-center">
                {product.productName}
              </h3>
              <p className="text-center text-[7px] md:text-[10px] text-gray-600">
                ${product.price}
              </p>
              <button className="mt-3 w-full text-[8px] md:text-sm font-medium text-white bg-[#FF6A1A] hover:bg-[#e55a18] rounded-lg py-1 transition duration-300">
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>

      {/* About Us Content Section */}
      <div className="ml-0 md:ml-10 mt-5 md:mt-0 text-center md:text-left">
        <CommonText small="About us" header="About Fresh Harvest" />
        <p className="text-gray-700 mt-3 text-sm md:text-base max-w-xl mx-auto md:mx-0">
          Welcome to Fresh Harvest. Your premier destination for high-quality
          and fresh produce. We are passionate about providing you with the
          finest fruits, vegetables, and salad ingredients to nourish your body
          and delight your taste buds, with a commitment to excellence,
          sustainability, and customer satisfaction. Fresh Harvest is here to
          revolutionize your grocery shopping experience.
        </p>
        <div className="flex justify-center md:justify-start mt-5">
          <button className="border border-[#FF6A1A] text-[#FF6A1A] font-bold px-5 py-3 rounded-lg hover:bg-[#FF6A1A] hover:text-white transition duration-300">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
