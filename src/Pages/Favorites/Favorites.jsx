import React from "react";
import { Link } from "react-router-dom";
import CommonText from "../../components/shared/CommonText";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import useFavorites from "../../hooks/useFavorites";
import Swal from "sweetalert2"; // Import SweetAlert2

const Favorites = () => {
  const favorites = useFavorites();

  // Function to remove a product from favorites
  const handleRemoveFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    window.location.reload(); // Reload the page to update the component after removal
  };

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in the cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product to the cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show success notification using SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.productName} has been added to your cart.`,
      confirmButtonText: "Ok",
      background: "#fefefe",
      iconColor: "#FF6A1A", // Change the icon color to match the theme
    });
  };

  return (
    <div className="max-w-[1400px] mt-20 mx-auto px-4">
      <div className="text-center">
        <CommonText small="Your" header="Favorites" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            You have no favorite products yet.
          </p>
        ) : (
          favorites.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-[280px] h-[400px] border p-4 rounded-lg shadow-md flex flex-col items-center justify-between"
            >
              <img
                src={product.images[0] || "/default-image.png"}
                alt={product.productName}
                className="w-full h-[200px] sm:h-[250px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                {product.productName}
              </h3>
              <p className="text-center font-bold text-[#FF6A1A]">
                ${product.price}
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => handleRemoveFromFavorites(product.id)}
                  className="w-full border-[#D9D9D9] hover:border-white text-[#212337] border-2 p-2 rounded-lg bg-white hover:text-white hover:bg-[#FF6A1A] transition duration-300"
                >
                  <FaHeart /> Remove from Favorites
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full border-[#D9D9D9] hover:border-white text-[#212337] border-2 p-2 rounded-lg bg-white hover:text-white hover:bg-[#FF6A1A] transition duration-300"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
