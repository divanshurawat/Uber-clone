import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [type, setType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData={
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        type: type,
        capacity: vehicleCapacity
      }
    }
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);


    if(response.status===201){
      const data= response.data;
      localStorage.setItem('token', data.token);
      navigate('/captain-home');

    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");    
    setType("");
    setVehicleCapacity("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
        ></img>

        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex gap-3 mb-6">
            <input
              className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            className="bg-gray-200 mb-6 font-medium rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-sm placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-sm placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <select
              className="bg-gray-200 w-1/2 font-medium rounded px-4 py-2 border text-sm placeholder:text-sm"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>

            <input
              className="bg-gray-200 w-1/2 mb-6 font-medium rounded px-4 py-2 border text-sm placeholder:text-sm"
              required
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
          </div>

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base"
            type="submit"
          >
            Create Captain Account
          </button>
        </form>
        <p className="text-ceter">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            {" "}
            Login{" "}
          </Link>
        </p>
      </div>

      <div className="mt-4">
        <p className=" text-[9px] leading-tight">
          By procedding, you concent to get updates about UBER services and
          offers.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
