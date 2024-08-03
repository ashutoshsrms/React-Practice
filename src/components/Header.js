import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-pink-200 to-pink-250 shadow-lg">
      <div className="flex-shrink-0">
        <img className="w-32" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex flex-wrap items-center space-x-4 text-lg font-semibold text-gray-700">
        <div className="flex space-x-4">
          <span className="px-3">
            OnlineStatus {onlineStatus ? "✅" : "🔴"}
          </span>
          <Link to="/" className="px-3 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="px-3 hover:text-gray-900">
            About Us
          </Link>
          <Link to="/contact" className="px-3 hover:text-gray-900">
            Contact Us
          </Link>
          <Link to="/grocery" className="px-3 hover:text-gray-900">
            Grocery
          </Link>
          <Link to="/cart" className="px-3 hover:text-gray-900">
            🛒 ({cartItems.length} items)
          </Link>
        </div>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-300 ease-in-out"
          onClick={() => setbtnName(btnName === "Login" ? "Logout" : "Login")}
        >
          {btnName}
        </button>
        <span className="px-3 hover:text-gray-900">{loggedInUser}</span>
      </div>
    </div>
  );
};

export default Header;
