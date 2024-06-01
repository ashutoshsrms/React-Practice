import { CDN_URL, LOGO_URL } from "../utils/constant";
const RestaurantCard = (props) => {
  const { restData } = props;
  // console.log(restData.name);

  const { cloudinaryImageId, name, avgRating, cuisines, costForTow, sla } =
    restData?.info;

  return (
    <div className="rest-card">
      <img className="rest-logo" alt="" src={CDN_URL + cloudinaryImageId} />

      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTow}</h4>
      <h4>{sla.deliveryTime} Minutes</h4>
    </div>
  );
};

export default RestaurantCard;
