import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5
            className="p-1 w-[93%] text-center absolute top-0"
            onClick={() =>{
                props.setRidePopUpPanel(false)
            }}
            >
            <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-3">New ride available !</h3>
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
                            <p className='text-lg font-medium -mt-1 text-gray-900'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <p className='-mt-1 text-lg font-medium text-gray-900'>{props.ride?.destination}</p>
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
                <div className='mt-5 flex w-full items-center justify-between'>
                    <button onClick={()=>{
                        props.setRidePopUpPanel(false);
                    }} className=' bg-gray-300 text-gray-900 font-semibold p-3 px-10 rounded-lg'>Ignore</button>
                    <button onClick={()=>{
                        props.setConfirmRidePopUpPanel(true);
                        props.confirmRide()
                    }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
                    
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
