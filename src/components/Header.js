import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const {loggedInUser}=useContext(UserContext);

  const cartItems=useSelector((store)=>store.cart.items);
  console.log(cartItems)

  return (
    <div className=" flex justify-between items-center bg-gradient-to-r from-pink-200 to-pink-250 shadow-lg">
      <div className="logo-container ml-4">
        <img className="w-32" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-4 mr-4 text-lg font-semibold text-gray-700 ">
          <li className="px-3">OnlineStatus {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="px-3 hover:text-gray-900">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-3 hover:text-gray-900">
            <Link to="/contact"> Contact Us</Link>
          </li>
          <li className="px-3 hover:text-gray-900">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-3 hover:text-gray-900">
            <Link to="/cart">🛒 ({cartItems.length} itmes)</Link>
          </li>
          <button
            className="px-3 py-1 bg-green-500 text-white rounded-xl  shadow hover:bg-green-600 transition duration-300 ease-in-out"
            onClick={() => {
              btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-3 hover:text-gray-900">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
