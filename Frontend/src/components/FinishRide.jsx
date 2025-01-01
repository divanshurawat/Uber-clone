import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate= useNavigate();
    async function endRide(){
        const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        if(response.status===200){
            navigate('/captain-home');
        }
    }

    return (
        <div >
            <h5
            className="p-1 w-[93%] text-center absolute top-0"
            onClick={() =>{
                props.setFinishRidePanel(false)
            }}
            >
            <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-3">Finish this ride !</h3>
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg'>
                <div className='flex items-center gap-3 ' >
                    <img className='h-12 w-10 rounded-full object-cover' src='https://i.pinimg.com/736x/db/a9/ce/dba9ce433113b68e719456b6d78c4f2a.jpg'></img>
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM away</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <p className='text-lg font-medium -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <p className='text-lg font-medium -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="tetx-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-10 w-full'>
                    <button onClick={endRide} className='w-full text-lg mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride !</button>
                    <p className='text-xs  text-gray-600'>Click on finish ride button if you have completed the payment.</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
