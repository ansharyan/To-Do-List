import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    dueDate:{
        type: Date,
    },
    category:{
        type: String,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Task = mongoose.model("Task", taskSchema);