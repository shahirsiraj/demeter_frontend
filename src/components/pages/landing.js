import React from "react";
// import { useSelector } from "react-redux";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // const { _id } = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    <div>
      {/* (TOP SECTION) */}
      {/* <Navbar /> */}
      <div className="bg-background.default h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8">
        Welcome to Bacchus
      </h1>
      <p className="text-lg md:text-xl text-neutral.light text-center max-w-md mb-8">
       Love food but can't decide where to eat? Bacchus is here to help!
      </p>
      <button 
      onClick={()=>navigate('/register')}
      className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary.dark transition-colors duration-300">
        Get Started
      </button>
    </div>
    </div>
  );
}

