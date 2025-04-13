import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/task.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/tasks", route)

const port = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URI;

const connectdb = async () =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected")
    } catch (error) {
        console.log(`MONGODB error: ${error}`);
    }
}
app.listen(port, async ()=>{
    console.log(`App is listening on port ${port}`);
    connectdb();
})