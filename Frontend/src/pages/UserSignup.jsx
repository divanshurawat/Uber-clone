import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const[firstName, setFirstName]= useState('');
  const[lastName, setLastName]= useState('');
  const[userData, setUserData]= useState({});

  const navigate = useNavigate();

  const {user, setUser}= useContext(UserDataContext);
  const submitHandler = async(e) => {
    e.preventDefault();
    const newUser={
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);


    if(response.status===201){
      const data= response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        ></img>

        <form onSubmit={(e)=>
          submitHandler(e)
        }>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className='flex gap-3 mb-6'>
          <input
            className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-lg placeholder:text-base"
            required
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
          />
          <input
            className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-lg placeholder:text-base"
            required
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
          />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-gray-200 mb-6 font-medium rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <h3 className="textlge font-medium mb-2">Enter your password</h3>
          <input
            className="bg-gray-200 mb-6 font-medium rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-ceter">Already have an account? <Link to="/login" className="text-blue-600"> Login </Link></p>
      </div>

      <div className="mt-4">
        <p className=' text-[9px] leading-tight'>
          By procedding, you concent to get updates about UBER services and offers.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
