import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {format} from "date-fns"

export default function EditTask() {
    const { id } = useParams();

    const navigate = useNavigate();

    const{data:task, isLoading} = useQuery({
        queryKey: ['task'],
        queryFn: async() =>{
          try {
            const res = await fetch(`/api/tasks/${id}`);
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || "Something went wrong");
            }
            return data|| null;
          } catch (error) {
            throw new Error(error);
          }
        }

    })

    const {mutate:editTask, isPending:isEditing} = useMutation({
        mutationFn: async ({id,task}) =>{
          try {
            const res = await fetch(`/api/tasks/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(task),
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
          alert("Task edited successfully");
            navigate("/");
        },onError:(error) =>{
            alert(error.message);
        }
    })

  const[formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  useEffect(()=>{
    if(task){
        setFormData({
            title: task.title,
            description: task.description,
            category: task.category,
            dueDate: task.dueDate,
        })
    }
  }, [task])

  const handleFormdata = (e) =>{
    setFormData ({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    editTask({id:id, task: formData});
  }

  return (
    <div className="w-10/12 mx-auto mt-10 ">
      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Edit task</legend>

        <label className="fieldset-label">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Task Title"
          value={formData.title}
          name="title"
          onChange={handleFormdata}
        />

        <label className="fieldset-label">Description</label>
        <input
          type="text"
          className="input w-full"
          placeholder="my-awesome-page"
          name="description"
          value={formData.description}
          onChange={handleFormdata}
        />

        <label className="fieldset-label">Due Date</label>
        <input
            type="date"
            name="dueDate"
            value={(formData.dueDate.split("T")[0])|| ""}
            onChange={handleFormdata}
            className="input w-full"
        />

<div className='flex flex-col gap-2 mt-4'> 
        <p className='text-lg'>Choose Category:</p>
        <span className='flex gap-2 text-md'>
            <input type='radio' name='category' id='Work' value='Work' onChange={handleFormdata} checked={formData.category === 'Work'} /> 
            <label htmlFor='Work'>Work</label>
        </span>
        <span className='flex gap-2 text-md'>        
            <input type='radio' name='category' id='Personal' value='Personal' onChange={handleFormdata} checked={formData.category === 'Personal'} /> 
            <label htmlFor='Personal'>Personal</label>
        </span>
        <span className='flex gap-2 text-md'>
            <input type='radio' name='category' id='Study' value='Study' onChange={handleFormdata} checked={formData.category === 'Study'} />
            <label htmlFor='Study'>Study</label>
        </span>
        </div>
        <button onClick={handleSubmit} className='btn btn-primary text-amber-50'>{isEditing? "Editing": "Edit task"}</button>
        
      </fieldset>
    </div>
  );
}
