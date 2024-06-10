import { CDN_URL, LOGO_URL } from "../utils/constant";
import { useState } from "react";

const RestaurantCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { restData } = props;
  // console.log(restData.name);

  const { cloudinaryImageId, name, avgRating, cuisines, costForTow, sla } =
    restData?.info;

  return (
    <div
      className={`m-4 p-4 w-[240px] rounded-lg bg-gray-100 hover:bg-gray-200 border ${
        isHovered ? "border-gray-500" : "border-gray-200"
      } transition duration-300 ease-in-out transform hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="rounded-lg" alt="" src={CDN_URL + cloudinaryImageId} />

      <h3 className="font-bold py-3 text-lg">{name}</h3>
      <h4 className=" ">{cuisines.join(", ")}</h4>
      <h4 className="rating">{avgRating} Stars</h4>
      <h4 className="cost-for-two">{costForTow}</h4>
      <h4 className="delivery-time">{sla.deliveryTime} Minutes</h4>
    </div>
  );
};

export default RestaurantCard;
