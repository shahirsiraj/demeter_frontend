import React, {useEffect, useState} from 'react';
import axios from "axios"

// Sample API response


export default function UserList() {

    const params = new URLSearchParams(window.location.search);
    const listId = params.get("list_id");

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            
    
            const response = await axios.get(
              `http://localhost:7800/api/v1/users/getallusers`)
    
            console.log(response.data.list_data);
            setUsersData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    

    const handleShare = async (user) => {

        try {
            const dataToSend = {
              user_id: user.id,
              list_id:listId
            };
    
            const response = await axios.post(
              `http://localhost:7800/api/v1/users/share`,
              dataToSend
            );

            alert(`shared list with ${user.name}!`)
    

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        // Implement your "Share with" logic here
        console.log(`Sharing with ${user.name}`);
      };
  return (
    <div className="restaurant-list flex flex-wrap gap-6">
      {usersData.map((user, index) => (
        <div key={index} className="mb-6">
          <div className="restaurant-card bg-white border rounded-lg p-4 shadow-md">
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>
            <div className="restaurant-card-details mt-3">
              <button onClick={() => handleShare(user)}>Share with</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};




