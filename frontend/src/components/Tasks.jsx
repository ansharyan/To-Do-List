import React, { use } from 'react'
import Task from './Task'
import {useQuery} from '@tanstack/react-query'

export default function Tasks({taskFeed,search, filter}) {
    const {isLoading, error, data:tasks} = useQuery({
      queryKey: ['tasks', taskFeed, search, filter],
      queryFn: async () => {
        let URL = "";
        if (taskFeed === "search") {
          URL = `/api/tasks?search=${search}`;
        } else if (taskFeed === "filter") {
          URL = `/api/tasks?filter=${filter}`;
        } else {
          URL = "/api/tasks";
        }
    
        const res = await fetch(URL);
        const data = await res.json();
    
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
    
        return data || [];
      }
    })

  return (
    <div className='mt-10'>
      {isLoading && (<h1>Loading...</h1>)}
      {!isLoading && tasks.length == 0 && (<p className='text-lg'>No Tasks😘</p>)}
        {!isLoading && tasks?.map((task) => (
            <Task key={task._id} task={task} />
        ))}
    </div>
  )
}
