import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null)
    const location = useLocation();
    console.log('Location state is : ',location.state);
    const rideData = location.state?.ride;
    console.log('Ride data ad captainRiding is : ',rideData);
    

    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      )

    return (
        <div className="h-screen relative">
            
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
      <div className="h-4/5">
        <LiveTracking />
      </div>
      <div className='h-1/5 p-6 items-center flex justify-between relative bg-yellow-400' 
        onClick={()=>{
            setFinishRidePanel(true)
        }}
      >
        <h5
            className="p-1 w-[93%] text-center absolute top-0"
            onClick={() =>{
                
            }}
            ><i className="text-3xl text-gray-700 ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
        <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride !</button>
      </div>
      <div ref={finishRidePanelRef}  className="w-full fixed z-10 translate-y-100 bottom-0 bg-white px-3 py-10">
        <FinishRide
         ride={rideData}
         setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
    )
}

export default CaptainRiding
