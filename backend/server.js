import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authroutes from "./routes/auth.routes.js";
import connect_to_mongodb from "./db/connection.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authroutes);
app.use('/api/message', messageRoute);
app.use('/user', userRoute);


app.listen((port), () => {
    connect_to_mongodb();
    console.log(`server is running on port ${5000}`)
}); 