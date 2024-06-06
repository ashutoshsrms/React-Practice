import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
// import restList from "../utils/mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filterListOfRestaurant, setfilterListOfRestaurant]=useState([])
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6385806&lng=77.3509327&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const restaurants =
      json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    // console.log(restaurants);
    setlistOfRestaurant(restaurants);
    setfilterListOfRestaurant(restaurants);
  };

  const onlineStatus=useOnlineStatus();

    if (onlineStatus === false) {
      return <h1>Looks Like you Are offline !! Please check your internet</h1>;
    }



  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filterRestaurants = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilterListOfRestaurant(filterRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filterRestaurants = filterListOfRestaurant.filter(
              (res) => res.info.avgRating > 4
            );
            setfilterListOfRestaurant(filterRestaurants);
            // console.log(filterRestaurants);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="rest-container">
        {filterListOfRestaurant.map((restaurant) => (
          <Link className="card-link"
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard  restData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
