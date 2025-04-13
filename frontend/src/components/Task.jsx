import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import {format} from "date-fns";

export default function Task({task}) {

  const queryClient = useQueryClient();

  const {mutate:deleteTask,isPending:isDeleting} = useMutation({
    mutationFn: async (id) =>{
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },onSuccess:(data) =>{
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })
  const{mutate:completeTask} = useMutation({
    mutationFn: async (id) =>{
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({isCompleted: true}),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },onSuccess:(data) =>{
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })

  const handleComplete= (e) =>{
    e.preventDefault();
    completeTask(task._id);
  }

  const handleDelete = (e) =>{
    e.preventDefault();
    deleteTask(task._id);
  }

  return (
    <div className={`flex flex-col shadow-xl/10 m-5 p-3 rounded-xl gap-2 bg-white `}>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{task?.title}</h1>
            <Link to={`/edit/${task._id}`}><MdEdit className='size-5' /></Link>
            
        </div>
        <p className='text-gray-500'>{task?.description}</p>
        <div className='btn w-fit px-6 h-fit py-1 mt-2'>{task?.category}</div>
        <div className='flex justify-between items-center'>
        <p>Due Date: {format(new Date(task.dueDate), 'MMM d, yyyy')}</p>
        <div className={`btn ${task.isCompleted ? "bg-green-200" : "bg-red-200"}`} onClick={handleComplete}>{task.isCompleted? "Completed" :"Incomplete"}</div>
        </div>
        <div className='btn btn-error h-fit py-1 w-fit' onClick={handleDelete}>{isDeleting? "Deleting" : "Delete"}</div>
    </div>
  )
}
