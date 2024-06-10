import { CDN_URL } from "../utils/constant";
import { useState } from "react";
// Import FontAwesome icons
import { FaStar, FaUtensils } from "react-icons/fa";

const RestaurantCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { restData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines, costForTow, sla } =
    restData?.info;

  return (
    <div
      className={`m-3 p-3 w-[200px] min-h-[380px] flex flex-col  rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 border ${
        isHovered ? "border-gray-500 shadow-xl" : "border-gray-200 shadow-md"
      } transition duration-300 ease-in-out transform hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <img
          className="rounded-lg mb-4 w-full h-32 object-cover"
          alt={name}
          src={CDN_URL + cloudinaryImageId}
        />
        <h3 className="font-bold py-2 text-lg text-center">{name}</h3>
        <h4 className="text-center text-gray-600 text-sm ">
          {cuisines.join(", ")}
        </h4>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-gray-700 font-semibold">{avgRating} Stars</span>
        </div>
        <h4 className="text-gray-700 font-medium">{costForTow}</h4>
        <h4 className="text-gray-700">{sla.deliveryTime} Minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
