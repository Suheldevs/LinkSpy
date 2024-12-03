import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <header className="bg-black py-4 sticky top-0 z-10 mb-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white"><span className='bg-white text-black rounded-lg px-1'>Link</span> <span>Spy</span></h1>
          <button className="bg-white  px-6 py-2 rounded hover:bg-gray-100 transition font-semibold ">
           <Link to='/signin'>Log In</Link> 
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header