import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import Authroute from './route/Authroute.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', Authroute);
const connect = await mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Connected to MongoDB at ${process.env.MONGODB_URL}`);
        });

    })
    .catch((e) => {
        console.log("MongoDB connection error:", e);
    });
