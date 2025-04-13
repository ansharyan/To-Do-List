import { Task } from "./models/task.js";

export const isExistingTask = async(req,res, next)=>{
    try {
        const task = req.body;
        const existingTask = await Task.findOne({title: task.title});
        if(existingTask){
            return res.status(400).json({message: "Task already exists"});
        }
        next();
    } catch (error) {
        res.status(500).json({message: "Error while checking task"});
    }
}