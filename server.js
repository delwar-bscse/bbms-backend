import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';

import testRouter from './routes/testRoutes.js';
import connectDB from './config/db.js';

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//routes
//1 test route
app.use("/api/v1/test", testRouter)

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, ()=>{
  console.log(`Node server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
})