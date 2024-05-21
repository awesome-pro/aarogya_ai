"use client";
import React, { useState } from 'react';
import{ AiOutlineCaretUp,AiOutlineCaretDown } from"react-icons/ai";

const Dropdown = () => {
    const [isOpen,setIsOpen]=useState(false);
    const list = [
        {
            "schedule": "Morning",
            "time": "08:30 AM to 12:00 PM"
        },
        {
            "schedule": "Afternoon",
            "time": "01:30 PM to 03:00 PM"
        },
        {
            "schedule": "Evening",
            "time": "04:30 PM to 7:00 PM"
        },
        {
            "schedule": "Night",
            "time": "10:00 PM to 12:30 AM"
        }
    ]
    return (
      <div className="relative flex flex-col items-center min-w-fit rounded-xl">
          <button 
          onClick={()=>setIsOpen((prev) => !prev)}
          className="bg-blue-500 text-white p-4 w-full flex item-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
              Check-Timings
              
              {!isOpen ? (
                  <AiOutlineCaretDown className="h-8"/>):(<AiOutlineCaretUp className="h-8"/>
  
              )}
              </button>
  
  
  {isOpen && (
      <div className="bg-gray-100 absolute z-50 top-20 flex flex-col item-startroundeed-lg p-2 w-full rounded-e">
      {list.map((item,i)=>(
          // eslint-disable-next-line react/jsx-key
          <div className="flex items-center justify-around w-full border-gray p-2 mt-1 mb-1 hover:bg-gray-200">
              <h3 className="ml-20 ">{item.schedule}</h3>
              <h3 className="ml-60 ">{item.time}</h3>
              
              </div>
      )
  
      )}
      </div>
  )}
        
      </div>
      
    );
}

export default Dropdown