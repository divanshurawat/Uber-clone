import React, { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(()=>{
    socket.emit('join', {userId: captain._id, userType: 'captain'});

    const updateLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {

              socket.emit('update-location-captain', {
                  userId: captain._id,
                  location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              })
          })
      }
  }
    const locationInterval= setInterval(updateLocation, 10000);
    updateLocation();

    // return ()=> clearInterval(locationInterval);
  })

  socket.on('new-ride',(data)=>{
    setRide(data);
    setRidePopUpPanel(true);
  })

  async function confirmRide(){
    
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setConfirmRidePopUpPanel(true);
    setRidePopUpPanel(false);
  }

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  )

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  )

  return (
    <div className="h-screen">
      <div className="fixed top-0 p-6 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-login"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt="Uber Map"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails/>
      </div>
      <div ref={ridePopUpPanelRef}  className="w-full fixed z-10 translate-y-100 bottom-0 bg-white px-3 py-10">
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopUpPanelRef}  className="w-full fixed h-screen z-10 translate-y-100 bottom-0 bg-white px-3 py-10">
        <ConfirmRidePopUp
         ride={ride}
         setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
