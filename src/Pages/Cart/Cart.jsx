import React from "react";
import useCart from "../../hooks/useCart";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cart = useCart();

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div className="max-w-[1400px] mt-20 mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#212337]">Your Cart</h2>
        <p className="text-lg text-[#4A4A52]">
          You have {cart.length} product(s) in your cart
        </p>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Product List */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b bg-[#f9f9f9]">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Quantity</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-[#f0f0f0]">
                    <td className="py-4 px-6 flex items-center">
                      <img
                        src={product.images[0] || "/default-image.png"}
                        alt={product.productName}
                        className="w-[50px] h-[50px] object-cover rounded-md mr-4"
                      />
                      <span>{product.productName}</span>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#FF6A1A]">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{product.quantity}</span>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#FF6A1A]">
                      ${(product.price * product.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary and Checkout */}
          <div className="flex flex-col items-center mt-8">
            <div className="w-full sm:w-1/2 md:w-1/3 text-center bg-[#f8f8f8] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#212337]">
                Total Price
              </h3>
              <p className="text-3xl font-bold text-[#FF6A1A]">
                ${calculateTotalPrice().toFixed(2)}
              </p>
              <button className="mt-4 bg-[#FF6A1A] text-white font-bold py-2 px-8 rounded-md hover:bg-[#FF471A] transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
