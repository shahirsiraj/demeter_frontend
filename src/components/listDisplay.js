import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectList } from "./stores/authSlice";

export default function ListRender() {
  const user = useSelector((state) => state.user);
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataToSend = {
          user_id: user.id,
        };

        const response = await axios.post(
          `http://localhost:7800/api/v1/food_list/getalluserlists`,
          dataToSend
        );

        console.log(response.data.list_data);
        setListData(response.data.list_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {listData.map((list) => (
        <div key={list.id} className="restaurant-card bg-white border rounded-lg p-4 shadow-md m-2">
          <div>
            <h2 className="text-xl font-semibold">{list.list_name}</h2>
          </div>
          {/* You can add other card details here */}
          <div className="flex justify-end mt-3">
            <Link
              to={`/edit-list/?list_id=${list.id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Show List
            </Link>
            <Link
          to={`/share/?list_id=${list.id}`}
        >
          <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Share this list!
          </button>
        </Link>
          </div>
        </div>
      ))}
      <div>
        <Link
          to={'/createnewlist'}
         
        >
          <button
           className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Create New List!
          </button>
        </Link>
       
      </div>
    </>
  );
}
