import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import CommonText from "../../components/shared/CommonText";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductDetails = () => {
  const product = useLoaderData();
  const { categoryId, description, images, price, productName, id } =
    product.data;

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch(
          "https://api-fresh-harvest.code-commando.com/api/v1/category"
        );
        const categoryData = await categoryResponse.json();

        if (categoryData.success) {
          setCategories(categoryData.data);
          const category = categoryData.data.find(
            (cat) => cat.id === categoryId
          );
          if (category) setCategoryName(category.categoryName);
        }

        // Fetch related products
        const productResponse = await fetch(
          "https://api-fresh-harvest.code-commando.com/api/v1/products"
        );
        const productData = await productResponse.json();
        if (productData.success) {
          const filteredProducts = productData.data.filter(
            (p) => p.categoryId === categoryId && p.id !== id
          );
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, [categoryId, id]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    // Check if product is already in favorites
    if (!favorites.some((fav) => fav.id === id)) {
      favorites.push(product.data);
      localStorage.setItem("favourites", JSON.stringify(favorites));
      alert("Product saved to favorites!");
    } else {
      alert("This product is already in your favorites.");
    }
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === id);

    if (existingProductIndex >= 0) {
      // Update quantity if product already in cart
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart with quantity
      cart.push({ ...product.data, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-[1400px] mt-20 mx-auto px-4">
      {/* Main Product Details Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto p-4 mt-5">
        {/* Product Image Slider */}
        <div className="flex justify-center md:w-1/2">
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper w-full h-[400px] md:h-[500px] rounded-lg shadow-md"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="mt-5 md:w-1/2">
          <CommonText small={categoryName} header={productName}></CommonText>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-yellow-500"
              >
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.849 1.418 8.261L12 18.902l-7.418 4.631L6 15.272 0 9.423l8.332-1.268z" />
              </svg>
            ))}
            <span className="font-bold">5.0 (1 REVIEW)</span>
          </div>
          <p className="text-2xl font-bold text-[#FF6A1A] mt-3">${price}/kg</p>
          <p className="text-lg text-gray-700 mt-3">{description}</p>
          <div className="flex items-center justify-around mt-4 border border-gray-300 rounded-md w-full md:w-fit">
            <span className="block">Quantity</span>
            <button
              onClick={handleDecrement}
              className="w-12 h-12 text-xl text-gray-700 flex items-center justify-center border-r border-gray-300"
            >
              -
            </button>
            <div className="w-16 h-12 text-lg flex items-center justify-center font-semibold">
              {quantity}
            </div>
            <button
              onClick={handleIncrement}
              className="w-12 h-12 text-xl text-gray-700 flex items-center justify-center border-l border-gray-300"
            >
              +
            </button>
          </div>
          <div className="flex mt-5 gap-5 flex-col sm:flex-row">
            <button
              onClick={handleFavorite}
              className="flex text-[#4A4A52] rounded-md gap-2 justify-center items-center bg-gray-300 font-bold h-[64px] w-full sm:w-[280px]"
            >
              <FaHeart /> Save as Favorite
            </button>
            <button
              onClick={handleAddToCart}
              className="flex gap-2 justify-center rounded-md items-center text-white bg-[#FF6A1A] font-bold h-[64px] w-full sm:w-[280px]"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="flex gap-3 items-center justify-start mt-5">
        <button className="w-[140px] h-[45px] bg-[#749B3F] text-white rounded-md">
          Description
        </button>
        <button className="w-[140px] h-[45px] bg-white text-slate-500 border border-slate-500 rounded-md">
          Reviews(1)
        </button>
      </div>

      <div className="mt-5 max-w-[894px] bg-[#F4F6F6] rounded-lg py-10 px-10 mb-20">
        {description}
      </div>

      {/* Related Products */}
      <div className="text-center mt-20 mb-20">
        <CommonText small="Our Products" header="Related Products" />
        <p className="text-[#4A4A52] mt-5 text-[14px]">
          We pride ourselves on offering a wide variety of fresh and flavorful
          fruits, vegetables, and salad ingredients.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 mp-10">
          {relatedProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="w-full max-w-[280px] h-[350px] border p-4 rounded-lg justify-center shadow-md flex flex-col items-center">
                <img
                  src={product.images[0] || "/default-image.png"}
                  alt={product.productName}
                  className="w-full h-[200px] sm:h-[180px] object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-center mb-2">
                  {product.productName}
                </h3>
                <p className="text-center font-bold text-[#FF6A1A]">
                  ${product.price}
                </p>
                <button className="w-full border-[#D9D9D9] hover:border-white text-[#212337] border-2 p-2 mt-4 rounded-lg bg-white hover:text-white hover:bg-[#FF6A1A] transition duration-300">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
