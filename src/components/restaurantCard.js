import React from "react";
import AddFoodBtn from "./addItemToList";
import { useSelector, useDispatch } from "react-redux";


export default function RestaurantCards () {

  const list = useSelector((state) => state.selectedList);
  const user = useSelector((state) => state.user);
  
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const selectedListQueryParam = queryParams.get('selectedList');


const RestaurantCard = ({ restaurant }) => {
  const {
    name,
    business_status,
    photos,
    opening_hours,
    rating,
    vicinity,
  } = restaurant;

  return (
    <div className="w-full">
      <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600">
        <h2 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700">{name}</h2>
        <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'>{business_status}</p>
      </div>
      <div className="restaurant-card-image">
        {photos && photos.length > 0 && (
          <img src={photos[0]} alt={name} />
        )}
      </div>
      <div className="restaurant-card-details">
        {opening_hours && (
          <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700' >
            Operating Hours:{" "}
            {opening_hours.open_now ? "Open" : "Closed"}
          </p>
        )}
        <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'>Rating: {rating}</p>
        <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'>Address: {vicinity} </p>
        <AddFoodBtn list_idProp={list || null} food_dataProp={restaurant} userProp={user} />
      </div>
    </div>
  );
};

const RestaurantList = ({ restaurants }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            
      {restaurants.map((restaurant, index) => (
        <br>
         <RestaurantCard key={index} restaurant={restaurant} />
        </br>
       
      ))}
    </div>
    </div>
</section>
  );
};


};


