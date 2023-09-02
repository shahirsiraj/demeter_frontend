import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setLogout } from "./stores/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const user = useSelector((state) => state.user);
  const userLists = useSelector((state) => state.user);
  
  const isAuth = Boolean(useSelector((state) => state.token));


  // const name = `${user.name}`;



    ;
    
    

  return (
    <nav className="border-gre-200 px-2 mb-10 w-screen">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
      <a href="/" className="flex">
        {/* Your logo */}
      </a>
      <div className="flex md:order-2">
        {/* ... Other search and mobile menu code */}
      </div>
      <div
        className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1"
        id="mobile-menu-3"
      >
        <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
          <li>
            <a
              href="/"
              className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/explore"
              className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
              aria-current="page"
            >
              Explore
            </a>
          </li>
          {user ? (
            // If token is present, show profile link
            <>
            
            <li>
              <a
                href="/profile"
                className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
                >
                  {user.name}
              </a>
              {/* {router.push('/profile')} */}
            </li>
            
            <li>
              <a
                href="/displaylists"
                className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
                >
                  My Lists
              </a>
              {/* {router.push('/profile')} */}
            </li>
            <li>
              <a
              href="/login"
              onClick={() => dispatch(setLogout())}
              className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded">
                Log Out
              </a>
            </li>
            </>
          ) : (
      
            <>
              <li>
                <a
                  href="/login"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
  );
}
