import mongoose from "mongoose";

/*
The userID field in this Mongoose schema is creating a reference to another collection (specifically the User collection). Here's what it's doing:

Purpose
It's establishing a foreign key relationship between the Resume collection and the User collection, allowing you to link each resume to a specific user.

Breaking Down the Configuration
type: mongoose.Schema.Types.ObjectId - Specifies that this field will store MongoDB's ObjectId type (the unique identifier MongoDB automatically creates for documents)
ref: 'User' - Tells Mongoose that this ObjectId references documents in the 'User' collection (or model)
*/

// create SCHEMAS (give structures)
// not Typescript, but have to do with DB
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

/*alternative way to enforce not null on a schema
    name :{
    type: String,
    required:true
  },
 */
const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: String,
  skills: [String],
  version: Number,
  tailoredFor: {
    type: String,
    default: null,
  },
  userID: {
    // foreign key from the user object
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

/* alt Schemas
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experience: String,
  skills: [String],
  version: {
    type: Number,
    default: 1
  },
  tailoredFor: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });
*/

// creating MODELS for each collection of documents, and each document will follow structure defined  by the schema
export const User = mongoose.model("User", userSchema); // will make User lowercase and plural: User becomes -> users

export const Resume = mongoose.model("Resume", resumeSchema); // Resume -> resumes

// define the route / endpt
// let resumes = [
// {
//   id: 1,
//   name: "John Doe",
//   role: "Full Stack dev",
//   experience: "3 years",
//   skills: ["JS", "React", "Node.js"],
//   tailoredFor: null,
// },
//   {
//     id: 2,
//     name: "Jane Smith",
//     role: "Data analyst",
//     experience: "2 years",
//     skills: ["Python", "SQL", "Tableau"],
//     tailoredFor: null,
//   },
// ];
