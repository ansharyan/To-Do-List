import React, { useState } from "react";
import "cally";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  const handleFormdata = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: addTask, isPending: isAdding } = useMutation({
    mutationFn: async (task) => {
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
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
    },
    onSuccess: (data) => {
      alert("Task added successfully");
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    // Add your submit logic here (e.g., send task to server)
  };
  return (
    <div className="w-10/12 mx-auto mt-10 ">
      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-lg text-primary">
          Add task
        </legend>

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
          value={formData.dueDate}
          onChange={handleFormdata}
          className="input w-full"
        />
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg">Choose Category:</p>
          <span className="flex gap-2 text-lg">
            <input
              type="radio"
              name="category"
              id="Work"
              value="Work"
              onChange={handleFormdata}
              checked={formData.category === "Work"}
            />
            <label for="Work">Work</label>
          </span>
          <span className="flex gap-2 text-lg">
            <input
              type="radio"
              name="category"
              id="Personal"
              value="Personal"
              onChange={handleFormdata}
              checked={formData.category === "Personal"}
            />
            <label for="Personal">Personal</label>
          </span>
          <span className="flex gap-2 text-lg">
            <input
              type="radio"
              name="category"
              id="Study"
              value="Study"
              onChange={handleFormdata}
              checked={formData.category === "Study"}
            />
            <label for="Study">Study</label>
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary text-amber-50"
        >
          {isAdding ? "Adding" : "Add Task"}
        </button>
      </fieldset>
    </div>
  );
}
