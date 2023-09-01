import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectList } from "./stores/authSlice";

export default function AddFoodBtn({ list_idProp, food_dataProp, userProp }) {
  const dispatch = useDispatch();
//   const list = useSelector((state) => state.selectedList);
  const user = useSelector((state) => state.user);

  const handleOnClick = async (list_id, food_data) => {
    try {
      // Your dispatch logic goes here

      const dataToSend = {
        name: food_data.name,
        address: food_data.vicinity,
        opening_hours: food_data.opening_hours,
        photos: food_data.photos,
        rating: food_data.rating,
        creator_id: user.id,
        list_id:  list_id // Replace this with actual list_id or variable
      };

      const food_data_response = await axios.post(
        `http://localhost:7800/api/v1/food_items/additemtolist`,
        dataToSend
      );

      console.log(food_data_response);

      return (
        <div>
          <p>Added successfully!</p>
        </div>
      );
    } catch (err) {
      console.log("There was an error adding your food item to the list!", err);
      alert("An error occurred");
    }
  };

  return (
    <button
      type="button"
      className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
      onClick={() => handleOnClick(list_idProp, food_dataProp)}
    >
      Add to List!
    </button>
  );
}
