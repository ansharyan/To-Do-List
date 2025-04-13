import { Task } from "../models/task.js";

export const getAllTasks = async(req, res)=>{
    const {search, filter} = req.query;
    try {
        if(search) return searchTask(req,res);
        if(filter) return filterTask(req,res);

        const tasks = await Task.find();
        res.send(tasks).status(200);
    } catch (error) {
        res.status(500).json("Error while fetching tasks");

    }
}

export const getTask = async(req,res) =>{
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if(!task) return res.status(404).json("Task not found");
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json("Error while fetching task");
    }
}

export const addNewTask = async(req, res)=>{
    try {
        const task = req.body;
        const newTask = new Task(task);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteTask = async(req, res)=>{
    const {id} = req.params;
    try {
        const task = Task.findById(id);
        if(!task) return res.status(404).json("Task not found");

        await Task.findByIdAndDelete(id);
        res.status(200).json("Task deleted successfully");
    } catch (error) {
        res.status(500).json("Error while deleting task");
    }
}

export const editTask = async(req, res)=>{
    const {id} = req.params;
    try {
        const {title, description,category} = req.body;
        const task = await Task.findById(id);
        if(!task) return res.status(404).json("Task not found");
        task.title = title;
        task.description = description;
        task.category = category;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const toggleTask = async(req, res)=>{
    const id = req.params.id;

    try {
        const task = await Task.findById(id);
        if(!task) return res.status(404).json("Task not found");

        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json("Error while task status");
    }
}

const searchTask = async(req,res)=>{
    try {
        const search = req.query.search;
        const tasks = await Task.find();
        const searchTasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        )
        if(!tasks) return res.status(404).json("Task not found");
        res.status(200).json(searchTasks);
    }
    catch (error) {
        res.status
    }
}

const filterTask = async(req, res)=>{
    const filter = req.query.filter;
    try {
        const filter = req.query.filter;
        const tasks = await Task.find({category: filter});
        if(!tasks) return res.status(404).json("Task not found");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json("Error while filtering tasks");
    }
}