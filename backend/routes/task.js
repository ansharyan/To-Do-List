import express from "express";
import { addNewTask, deleteTask, editTask, getAllTasks, getTask, toggleTask } from "../controller/task.js";

const route = express.Router();

route.get("/", getAllTasks);
route.get("/:id", getTask);
route.post("/", addNewTask);
route.delete("/:id", deleteTask);
route.put("/:id", editTask);
route.patch("/:id", toggleTask);


export default route;