import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate= useNavigate();
    const submitHandler= async (e)=>{
        e.preventDefault();
        const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params:{
                rideId: props.ride._id,
                otp:otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        if(response.status===200){
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopUpPanel(false);
            navigate('/captain-riding'),{state: {ride: props.ride}};
            console.log('Ride data sending to captainridign from confirmride ppop is',props.ride);
        }

    }
    return (
        <div >
            <h5
            className="p-1 w-[93%] text-center absolute top-0"
            onClick={() =>{
                props.setRidePopUpPanel(false)
            }}
            >
            <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-3">Comfirm your ride !</h3>
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg'>
                <div className='flex items-center gap-3 ' >
                    <img className='h-12 w-10 rounded-full object-cover' src='https://i.pinimg.com/736x/db/a9/ce/dba9ce433113b68e719456b6d78c4f2a.jpg'></img>
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
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
                
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input onChange={(e)=>setOtp(e.target.value)} className='bg-gray-200 px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' type='number' placeholder='Enter OTP'></input>
                    <button className='w-full text-lf mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
                    <button onClick={()=>{
                        props.setConfirmRidePopUpPanel(false);
                        props.setRidePopUpPanel(false);
                    }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-2 rounded-lg'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
