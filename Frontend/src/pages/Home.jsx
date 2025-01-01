import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [type, setType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const {socket }= useContext(SocketContext);
  const {user}= useContext(UserDataContext);
  
  useEffect(()=>{
    socket.emit("join",{userType: 'user', userId: user._id});
  },[user])

  socket.on('ride-confirmed', ride=>{
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })

  socket.on('ride-started', ride=>{
    setWaitingForDriver(false);
    navigate('/riding',{state:{ride}});
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
      // useEffect(() => {
      //   console.log("Updated pickup suggestions:", pickupSuggestions);
      // }, [pickupSuggestions]);
      
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDestinationSuggestions(response.data);
  } catch (error) {
    // handle error
  }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        opacity: 1,
        padding: 24,
        duration: 0.5,
      });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(panelRef.current, { height: "0%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [panelOpen]);

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup: pickup, destination: destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup: pickup,
      destination: destination,
      type: type,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    // console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <LiveTracking /> 
      </div>{" "}
      //Live Tracking
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"? pickupSuggestions: destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <VehiclePanel
          setType={setType}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          type={type}
          createRide={createRide}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <LookingForDriver 
        pickup={pickup}
        destination={destination}
        fare={fare}
        type={type}
        createRide={createRide}
        setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="w-full fixed z-10 bottom-0  bg-white px-3 py-10"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
