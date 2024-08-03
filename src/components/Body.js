import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
// import restList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filterListOfRestaurant, setfilterListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);
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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Looks Like you Are offline !! Please check your internet</h1>;
  }

  const {loggedInUser, setUserName}=useContext(UserContext)

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body p-4">
      <div className="filter flex flex-wrap justify-center items-center bg-gray-100 rounded-lg shadow-md mb-2 p-4">
        <div className="search flex items-center m-2">
          <input
            type="text"
            className="search-box border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
            placeholder="Search Restaurants..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-button ml-3 px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transition duration-300 ease-in-out"
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
        <div className="m-2">
          <button
            className="filter-btn px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-blue-600 transition duration-300 ease-in-out"
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

        <div className="m-2 flex items-center">
          <label>UserName : </label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {filterListOfRestaurant.map((restaurant) => (
          <Link
            className="card-link"
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.avgRating >= 4.5 ? (
              <RestaurantCardPromoted restData={restaurant} />
            ) : (
              <RestaurantCard restData={restaurant} />
            )}

            {/* <RestaurantCard restData={restaurant} /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
