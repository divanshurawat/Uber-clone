import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const {captain, setCaptain}= useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain={
      email: email,
      password: password
    }
    
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

    if(response.status===200){
      const data= response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }


    setEmail('');
    setPassword('');
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
        ></img>

        <form onSubmit={(e)=>
          submitHandler(e)
        }>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-gray-200 mb-7 font-medium rounded px-4 py-2 border w-full text-lg placeholder:base"
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2">Enter your password</h3>
          <input
            className="bg-gray-200 mb-7 font-medium rounded px-4 py-2 border w-full text-lg placeholder:base"
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-ceter">Join a fleet? <Link to="/captain-signup" className="text-blue-600"> Register as a captain</Link></p>
      </div>

      <div className="mt-4">
        <Link
          to="/login"
          className="bg-[orange] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:base"
          type="submit"
        >
          Sign In as User 
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
