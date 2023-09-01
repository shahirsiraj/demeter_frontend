

import axios from "axios"
import { useState, useEffect } from "react"
import AddFoodBtn from "../addItemToList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";




export default function Explore() {


  const params = new URLSearchParams(window.location.search);
  const listId = params.get("list_id");

  console.log(listId)


  // const list = useSelector((state) => state.selectedList);
  const user = useSelector((state) => state.user);
  




    const [formData, setFormData] = useState({
        keyword: '',
        location: ''
      });

    const [locationData, setLocationData] = useState({

    })

    const [responseData, setResponseData] = useState(
      []
    )

    const [responseCards, setResponseCards] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      if('geolocation' in navigator) {
          // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
          navigator.geolocation.getCurrentPosition(({ coords }) => {
              const { latitude, longitude } = coords;
              setLocationData({ latitude, longitude });
          })
      }
  }, []);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          location: locationData
        }));
        console.log(formData)
      };

      // useEffect(()=>{
      //   console.log(responseData)
      // },[responseData])

      
    
      const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData)
        try {
          // Make a POST request to your backend with formData
          const response = await axios.post('http://localhost:7800/search', 
          formData, {
            headers: {
              'Content-Type': 'application/json'}})
          setResponseData(response.data)
          if (response.data) {
            // Update the state variable to indicate that data is loaded
            setDataLoaded(true);
          }
          console.log('Response from backend:', response.data);

          setResponseCards(response.data.map((item, index) => (
            <div key={index} className="w-full">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
    
              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    
         
            </div>
          )));
    
          setFormData({
            keyword: ''
          });

         
          
          console.log(response.data)
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
         
        }

        
      };




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
          <div className="restaurant-card bg-white border rounded-lg p-4 shadow-md">
            <div >
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className={`text-sm ${business_status === 'OPERATIONAL' ? 'text-green-500' : 'text-red-500'}`}>
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
              <p className="text-sm">Address: {vicinity}</p>
               <AddFoodBtn list_idProp={listId} food_dataProp={restaurant} userProp={user} />

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
      
      
      
    


    return(
      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16" >
      <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7 flex-wrap items-center justify-between">
        <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
          <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
            Get in touch
          </h4>
        </div>
        <form
          className="w-full mx-auto flex flex-col justify-center"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-4">
              <div className="w-full md:w-1/2 ">
                <label
                  htmlFor="keyword"
                  className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                >
                  What are you looking for?
                </label>
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  key="keyword"
                  placeholder="Enter Your search"
                  className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                  autoComplete="off"
                  spellCheck="false"
                  aria-invalid="false"
                  value={formData.keyword}
                  onChange={handleInputChange} // Add this line
                />
              </div>
              <button
                className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
        {dataLoaded && responseCards.length > 0 && (
          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className='flex'>
                <RestaurantList restaurants={responseData}/>
              </div>
            </div>
          </section>

      )}
      </div>
    </div>
      
    )
}