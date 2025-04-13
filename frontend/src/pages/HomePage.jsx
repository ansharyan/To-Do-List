import React, { useState } from 'react'
import Tasks from '../components/Tasks'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function HomePage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("");
  const [taskFeed, setTaskFeed] = useState("all");
  const handleSearch= (e) =>{
    setSearch(e.target.value);
    setTaskFeed("search")
  }

  const handleFilter= (e) =>{
    setFilter(e.target.value)
    setTaskFeed("filter")
  }

  return (
    <div className='flex flex-col w-10/12 mx-auto h-screen'>
       <label className="input w-full bg-gradient-to-r from-gray-50 to-primary/10 pr-0 mt-12 shadow-xl/10 ">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
    <input type="search" required placeholder="Search" value={search} onChange={handleSearch}/>
    <p className='btn btn-ghost'>Search</p>
  </label>

  <h1 className='mt-5 text-md'>Filter:</h1>
  <form className="filter mt-2">
    <input className="btn btn-square" type="reset" value="x" onClick={() =>{setTaskFeed("")}}/>
    <input className="btn" type="radio" name="frameworks" aria-label="Work" value={"Work"} onClick={handleFilter}/>
    <input className="btn" type="radio" name="frameworks" aria-label="Personal" value={"Personal"} onClick={handleFilter}/>
    <input className="btn" type="radio" name="frameworks" aria-label="Study" value={"Study"} onClick={handleFilter}/>
</form>
    
        <Link to={"/add"} className='btn btn-primary text-gray-100 mt-10'>Add new Task</Link>
        <Tasks taskFeed={taskFeed} search={search} filter={filter}/>
    </div>
  )
}
