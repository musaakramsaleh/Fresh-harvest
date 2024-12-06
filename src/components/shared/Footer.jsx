import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdCall, MdLocationOn, MdMessage } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      {/* Footer Grid Layout */}
      <div className="max-w-[1400px] mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company Info Section */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="logo" />
            <h2 className="text-3xl font-bold">Fresh Harvests</h2>
          </div>
          <div className="mt-24">
            <p className="font-medium">Get Our App:</p>
            <div className="flex gap-4 mt-2">
              <img className="h-10" src="/photono03.png" alt="App Store" />
              <img className="h-10" src="/photono04.png" alt="Google Play" />
            </div>
          </div>
        </div>

        {/* Navigation Links - Section 1 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Home", "Shop", "About Us", "Blog", "Detail Blog"].map(
              (link, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Navigation Links - Section 2 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Account</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Favorites", "Cart", "Sign In", "Register"].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">Reach Us</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <MdCall className="text-primary text-lg" />
              <span>+123 5678 90</span>
            </li>
            <li className="flex items-center gap-2">
              <MdMessage className="text-primary text-lg" />
              <span>freshharvests@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-primary text-lg" />
              <span>Tunjuk Street, Pontianak, Indonesia</span>
            </li>
          </ul>
          <div className="mt-6">
            <p className="font-semibold">Accepted Payments:</p>
            <div className="flex items-center gap-3 mt-3">
              {["Visa", "Paypal", "ApplePay"].map((method, index) => (
                <img
                  key={index}
                  className="object-contain bg-white p-1 rounded"
                  src={`/${method}.png`}
                  alt={method}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto px-6 mt-6">
        <hr className="border-gray-300" />
        <div className="flex flex-col lg:flex-row justify-between items-center mt-4">
          <p className="text-sm text-center lg:text-left">
            &copy; 2024 Fresh Harvests. Designed by Banana Studio.
          </p>
          <div className="flex space-x-3 text-lg">
            <AiFillTwitterCircle className="hover:text-blue-500" />
            <FaFacebook className="hover:text-blue-600" />
            <FaSquareInstagram className="hover:text-pink-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
