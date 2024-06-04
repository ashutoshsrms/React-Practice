import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constant";
import Error from "./Error";

const RestaurantMenu = () => {
  const [restInfo, setRestInfo] = useState(null);
  const [error, setError] = useState(null);
  const { restId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + restId);
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await data.json();
      setRestInfo(json.data);
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <Error />;
  }

  if (restInfo === null) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, cuisines } =
    restInfo?.cards[2]?.card?.card?.info || {};
  const itemCards =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;

  if (!itemCards) {
    return <Error />;
  }

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - {"Rs "}{" "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
