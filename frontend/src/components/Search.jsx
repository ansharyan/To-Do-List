import React, { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState("")
  const handleSearch= (e) =>{
    setSearch(e.target.value)
  }
  return (
    <label className="input w-full bg-gradient-to-r from-gray-50 to-primary/10 pr-0 mt-12 shadow-xl/10 ">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
    <input type="search" required placeholder="Search" value={search} onChange={handleSearch}/>
    <p className='btn btn-ghost'>Search</p>
  </label>
        
  )
}
