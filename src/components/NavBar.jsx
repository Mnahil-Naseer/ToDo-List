import React from 'react'
import logo from "./todo.jpg"
const NavBar = () => {
  return (
    <nav className='flex justify-center bg-teal-600 text-white py-2'>
       <img src={logo} alt="logo" className='w-10 h-10 rounded-full' />
        <div className="font-bold text-xl my-2 mx-2 justify-center flex ">
        To-Do</div>
    </nav>
  )
}

export default NavBar
