// Ep 4: https://youtu.be/T_OiJBjuiLE?si=rvUtLCAckmJb_ZZG
// Ep 5: https://youtu.be/Y0jJb7Ta5E4?si=f8Vay9DA8eTGAC6w
// https://mongoosejs.com/docs/queries.html

import dotenv from "dotenv";
import express from "express";
import { connectDb } from "../DB/db.js";
import mongoose from "mongoose";
import resumeRouter from "../routes/resume.js"
import { User, Resume } from "../DB/models.js";

// import OpenAI from 'openai';
// import { callAI } from "./utils/aiClient";

dotenv.config(); // process.env
const app = express();

app.use(express.json()); // middleware -> parse req.body


const PORT = process.env.PORT 



app.use("/resumeRoutes",resumeRouter)

connectDb().then(() => {
  // better to put connectDb() here since no point in starting App if can’t connect to Db

  app.listen(PORT, () => {
    console.log("server started on PORT: ", PORT);
  });
});



// connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then((connection)=> console.log("Mongoose DB connected", connection.connections[0].name)) // connection obj can also be logged
//   .catch((err) => console.log("MongoDB connection error", err)); // err obj
// .then( (connection) => console.log('Mongoose DB connected', connection)) // connection obj can also be logged

// type objectID (userID) behaves like foreign key, will connect the resume collection with user collection by creating reference to user collection

