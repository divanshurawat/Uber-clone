import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
        <h5
          className="p-1 w-[93%] text-center absolute top-0"
          onClick={() => props.setVehiclePanel(false)}
        >
          <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setType('car');
        }} className="w-full flex border-2 mb-2 active:border-black bg-gray-100 rounded-xl items-center justify-between p-3  ">
          <img
            className="h-12"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          ></img>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-fill">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="text-gray-600 text-xs">Affordable compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setType('moto');
          }} className="w-full flex border-2 mb-2 active:border-black bg-gray-100 rounded-xl items-center justify-between p-3  ">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          ></img>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              Moto{" "}
              <span>
                <i className="ri-user-fill">1</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="text-gray-600 text-xs">Affordable motorcycle ride</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setType('auto')
        }} className="w-full flex border-2 mb-2 active:border-black bg-gray-100 rounded-xl items-center justify-between p-3  ">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          ></img>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberAuto{" "}
              <span>
                <i className="ri-user-fill">3</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="text-gray-600 text-xs">Affordable auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
        </div>
    )
}

export default VehiclePanel
