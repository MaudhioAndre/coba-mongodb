import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

import { config } from "dotenv";
config();

const app = express();
// mongoose.connect(
//   `mongodb+srv://maudhioa:zJY8FfyqJAFDwnyt@coba-mongodb.3dgdr.mongodb.net/?retryWrites=true&w=majority&appName=coba-mongodb`
// );

mongoose.connect(`${process.env.DB_LINK}`,{
    // mongoose.connect('mongodb://localhost:27017/fullstack_db',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log(process.env.DB_LINK));
