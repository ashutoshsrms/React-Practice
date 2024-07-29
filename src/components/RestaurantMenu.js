import { useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
// import { MENU_API } from "../utils/constant";
import Error from "./Error";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

  const [showIndex, setShowIndex] = useState(null);
  const { restId } = useParams();

  const restInfo = useRestaurantMenu(restId);

  if (restInfo === null) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, cuisines } =
    restInfo?.cards[2]?.card?.card?.info || {};

  const itemCards =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;

  const categories =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  if (!itemCards) {
    return <Error />;
  }

  const toggleShowIndex = (index)=>{
    index === showIndex ? setShowIndex(null): setShowIndex(index)
  }

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-6">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordion */}
      {categories.map((category,index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={()=>toggleShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
