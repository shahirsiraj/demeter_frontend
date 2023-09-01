import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ListRender() {
  const [responseData, setResponseData] = useState([]);
  const [deletedRestaurants, setDeletedRestaurants] = useState([]);
  const [listId , setListId] = useState('')

  const user = useSelector((state) => state.user);
  useEffect(() => {

    async function getList() {
      try {
        const params = new URLSearchParams(window.location.search);
        const listId = params.get("list_id");

        setListId(listId)

        

        const dataToSend = {
          list_id: listId,
          user_id:user.id
        };
        const food_lists = await axios.post(
          `http://localhost:7800/api/v1/food_list/getlist`,
          dataToSend
        );
        console.log(food_lists)
        const foodListData = food_lists.data;

        setResponseData(foodListData);
        
      } catch (err) {
        console.log("An error occurred:", err);
        alert("Something happened");
      }
    }

    getList();
    setResponseData([])
  }, []);

  const handleDelete = async (id) => {



    try {

        console.log(id)

        // const dataToSend= {
        //     food_id : id
        // }

        const response = await axios.delete(
            `http://localhost:7800/api/v1/food_list/deleteitem?food_id=${id}`
          );
          
      
        // Add the restaurant id to the deletedRestaurants state
      setDeletedRestaurants([...deletedRestaurants, id]);
      console.log(response)
      alert('Item deleted successfully!')
    } catch (err) {
      console.log("An error occurred:", err);
      alert("Failed to delete the restaurant");
    }
  };



const RandomizeButton = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRandomize = () => {
    if (restaurants.length === 0) {
      alert('No restaurants available to randomize.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];

    setSelectedRestaurant(randomRestaurant);

    // Display the selected restaurant data in an alert
    alert(JSON.stringify(randomRestaurant, null, 2));
  };

  return (
    <div>
      <button onClick={handleRandomize} className="bg-blue-500 text-white px-4 py-2 rounded">
        Randomize
      </button>
      {selectedRestaurant && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Selected Restaurant:</h2>
          <pre>{JSON.stringify(selectedRestaurant, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};





  const RestaurantCard = ({ restaurant }) => {
    const { id, name, business_status, photos, opening_hours, rating, address } = restaurant;
    console.log(restaurant)
    if (deletedRestaurants.includes(id)) {
      return null; // Don't render if the restaurant is deleted
    }


    return (
      <div className="restaurant-card bg-white border rounded-lg p-4 shadow-md">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p
            className={`text-sm ${
              business_status === "OPERATIONAL" ? "text-green-500" : "text-red-500"
            }`}
          >
            {business_status}
          </p>
        </div>
        <div className="restaurant-card-image">
          {photos && photos.length > 0 && (
            <img src={photos[0]} alt={name} className="w-full rounded-lg" />
          )}
        </div>
        <div className="restaurant-card-details mt-3">
          {opening_hours && (
            <p className="text-sm">
              Operating Hours:{" "}
              {opening_hours.open_now ? "Open" : "Closed"}
            </p>
          )}
          <p className="text-sm">Rating: {rating}</p>
          <p className="text-sm">Address: {address}</p>
          <button
          onClick={() => handleDelete(id)}>
            Delete from list!
          </button>
        </div>
      </div>
    );
  };

  const RestaurantList = ({ restaurants }) => {
    return (
      <div className="restaurant-list flex flex-wrap gap-6">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="mb-6">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
      <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7 flex-wrap items-center justify-between">
        <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
          <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
            Test
          </h4>
        </div>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex">
              <RestaurantList restaurants={responseData} />
              <Link to={`/explore/?list_id=${listId}`} >
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add an item!
                </button>
              </Link>
              
            </div>
            <RandomizeButton restaurants={responseData} />
          </div>
        </section>
        
      </div>
    </div>
  );
}
