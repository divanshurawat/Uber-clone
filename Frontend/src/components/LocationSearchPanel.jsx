import React from 'react'
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({suggestions,setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField}) => {
    
    const handleSuggestionClick=(suggestion)=>{
        if(activeField==='pickup'){
            setPickup(suggestion);
        }else if(activeField==='destination'){
            setDestination(suggestion);
        }
    }

    
    return (
        <div>
            {/* Display fetched suggestions* */}
            {
                suggestions.map((elem, idx)=>(
                    <div key={idx} onClick={()=>handleSuggestionClick(elem.description)} className='flex gap-4 border-3 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center rounded-full w-12'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel
