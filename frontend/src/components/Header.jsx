import React from 'react'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className='mt-5 flex items-center gap-5 cursor-pointer' onClick={() =>{navigate("/")}}>
        <Logo className="sm:text-6xl"/>
        <div className='flex flex-col gap-2 '>
        <h1 className='font-bold text-4xl text-primary sm:text-6xl'>Task Mate</h1>
        <p className='text-gray-400 text-xl hidden md:block'>Advance To-Do List</p>
        </div>
    </div>
  )
}
