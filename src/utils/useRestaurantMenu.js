import { useEffect, useState } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (restId) => {
  const [restInfo, setRestInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + restId);
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await data.json();
      setRestInfo(json.data);
    } catch (error) {
      setError(error);
    }
    if (error) {
      return <Error />;
    }
  };
  return restInfo;
};

export default useRestaurantMenu;
