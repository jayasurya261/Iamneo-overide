import React from 'react'
import { ExpandableCardDemo } from './ui-caller/ExpandableCardDemo'

const ListReservation = () => {
  return (
    <div className='flex'>
      <div className="relative w-1/2">
        <img
          src="https://framerusercontent.com/images/ROjb9PujoDKXaFFJOWarbj3Nc.png"
          alt="booking table img"
          className="max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-7xl px-6 py-3 rounded-lg font-playfair font-thin">
            RESERVATIONS
          </h2>
        </div>
      </div>
      <div className='w-1/2 h-screen flex justify-center bg-black lg:pt-20'>
        <ExpandableCardDemo/>
      </div>
    </div>
  )
}

export default ListReservation