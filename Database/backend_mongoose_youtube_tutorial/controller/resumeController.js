// import { Request, Response, NextFunction } from "express";
import { request } from "express";
import { User, Resume } from "../DB/models.js";

export default {
  // ROUTES

  homePage: (_, response, next) => {
    response.locals.message = "Welcome to 2nd class - 3";
    next();
  },

  getAll: async (request, response, next) => {
    try {
      const resumes = await Resume.find();

      response.locals.resumeData = resumes;
      //  return response.json(resumes);
      next();
    } catch (error) {
      // return response.status(500).json({message:"error fetching resumes"})
      return next({
        log: " ERROR: Missing required properties in request body",
        status: 400,
        message: {
          err: `Unable to process request, api might be down ${error}`,
        },
      });
    }
  },

  getById: async (request, response, next) => {
    try {
      const resumeById = await Resume.findById(request.params.id);
      response.locals.resumeById = resumeById;
      next();
    } catch (error) {
      return next({
        log: " ERROR: Missing required properties in request body",
        status: 400,
        message: {
          err: `Id was not given correctly ${error}`,
        },
      });
    }
  },

  // // app.get("/resumes", async (req, res) => {
  // //   try {
  // //     const resumes = await Resume.find(); // ask the database to return all the documents. We use async / await because .find() is a promise
  // //     return res.json(resumes);
  // //   } catch (err) {
  // //     return res.status(500).json({ message: "error fetching resumes" });
  // //   }
  // // });

  // // OPTION 1: POST - MANUAL WAY
  // // app.post("/resumes",(req,res)=>{
  // //     console.log(req.body);
  // //     const {name,role,skills,experience} = req.body;

  // //     if(!name || !role) {
  // //         return res.status(400).json({message: "Name and role are required"})
  // //     }

  // // const newResume = {
  // // id: Date.now(),
  // //     name,
  // //     role,
  // //     skills,
  // //     experience,
  // //     tailoredFor: null,
  // // };
  // // console.log(newResume);
  // // resumes.push(newResume);

  // // res.status(201).json( {message: 'resume added successfully', data: newResume})
  // //

  // /*
  //   {
  //     "name": "John Doe",
  //     "role": "Full Stack dev",
  //     "experience": "3 years",
  //     "skills": ["JS", "React", "Node.js"],
  //     "version": 1,
  //     "tailoredFor": null
  //   }
  // */

  createResume: async (request, response, next) => {
    try {
      // const newResume = new Resume(request.body); // create new instance of Resume model
      // const newerResume = await newResume.save(); // unique id is created automatically here
      // creates an alphanumerical id in mongoDB

      const newResume = await new Resume(request.body).save();
      response.locals.newResume = newResume;
      // response.status(201).json({ message: "resume added successfully", data: newResume });
      next();
    } catch (error) {
      return next({
        log: " ERROR: Missing required properties in request body",
        status: 400,
        message: {
          err: `Id was not given correctly ${error}`,
        },
      });
    }
  },

  // // OPTION 2: POST - MONGOOSE IN-BUILT METHODS
  // // app.post("/resumes", async (req, res) => {
  // //   try {
  // //     console.log(req.body);
  // //     const { name, role, skills, experience } = req.body;

  // //     if (!name || !role) {
  // //       return res.status(400).json({ message: "Name and role are required" });
  // //     }
  // //     const newResume = new Resume(req.body); // create new instance of Resume model
  // //     await newResume.save(); // unique id is created automatically here
  // //     // creates an alphanumerical id in mongoDB
  // //     res
  // //       .status(201)
  // //       .json({ message: "resume added successfully", data: newResume });
  // //   } catch (err) {
  // //     return res.status(500).json({ message: "error saving resume" });
  // //   }
  // // });

  // // OPTION 1: PUT - MANUAL WAY
  // // app.put("/resumes/:id", (req, res) => {
  // //   const id= parseInt(req.params.id);
  // //   const index = resumes.findIndex( (resume) => resume.id === id);

  // //   if (index === -1) return res.status(404).json( {message: "Resume not found"});

  // //   const { name, role, skills, experience, tailoredFor } = req.body;
  // //   resumes[index] = {
  // //     ...resumes[index], // copying the properties from orig resume obj
  // //     name: name || resumes[index].name,
  // //     role: role || resumes[index].role,
  // //     skills: skills || resumes[index].skills,
  // //     experience: experience || resumes[index].experience,
  // //     tailoredFor: tailoredFor || resumes[index].tailoredFor,
  // //   };
  // // res.json({message:"resume updated succesfully", data:resume[index]});

  updateById: async (request, response, next) => {
    try {
      const id = request.params.id; // id actually is alpha-numerical, made up of nums and letters
      const data = request.body;

      // 3 params -> (id, new data from request.body, options -> how we want the update operation to perform)
      // Resume.findByIdAndUpdate(id, data, options)
      // options: {new:true} -> return the newer version of the document
      const updatedResume = await Resume.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        }
      ); // findByIdAndUpdate() returns a promise so use async / await
      response.locals.updatedResume = updatedResume;
      next();
    } catch (error) {
      return next({
        log: " ERROR: Missing required properties in request body",
        status: 400,
        message: {
          err: `Id was not given correctly ${error}`,
        },
      });
    }
  },

  // // OPTION 2: PUT - Mongoose method
  // // app.put("/resumes/:id", async (req, res) => {
  // //   try {
  // //     const id = req.params.id; // id actually is alpha-numerical, made up of nums and letters
  // //     const data = req.body;

  // //     // 3 params -> (id, new data from req.body, options -> how we want the update operation to perform)
  // //     // Resume.findByIdAndUpdate(id, data, options)
  // //     // options: {new:true} -> return the newer version of the document
  // //     const updatedResume = await Resume.findByIdAndUpdate(id, data, {
  // //       new: true,
  // //     }); // findByIdAndUpdate() returns a promise so use async / await
  // //     return res.json({
  // //       message: "resume updated succesfully",
  // //       data: updatedResume,
  // //     });
  // //   } catch (error) {
  // //     return res.status(500).json({ message: "error updating resume" });
  // //   }
  // // });

  // //OPTION 1: DELETE - manual way / not a real DELETE though....
  // // app.delete("/resumes/:id", (req, res) => {
  // //   const id = parseInt(req.params.id);
  // //   const initialLength = resumes.length;

  // //   resumes = resumes.filter( (resume) => resume.id !== id);
  // //   // intial length = 100
  // //   // filter should be 100-1

  // //   if (resumes.length === initialLength) {
  // //     return res.status(404).json( {message: "Resume not found"});
  // //   }

  // //   return res.json( {message: "Resume deleted successfully"});
  // // });

  deleteById: async (request, response, next) => {
    try {
      const id = request.params.id; // not parseInt since the id is alpha-numerical

      const resumeDeletedById = await Resume.findByIdAndDelete(id);

      response.locals.deletedById = resumeDeletedById;

      next();
    } catch (error) {
      return next({
        log: " ERROR: Missing required properties in request body",
        status: 400,
        message: {
          err: `Id was not given correctly ${error}`,
        },
      });
    }
  },

  // //OPTION 2: DELETE - Mongoose method
  // // app.delete("/resumes/:id", async (req, res) => {
  // //   try {
  // //     const id = req.params.id; // not parseInt since the id is alpha-numerical

  // //     await Resume.findByIdAndDelete(id);
  // //     return res.json({ message: "Resume deleted successfully" });
  // //   } catch (error) {
  // //     return res.status(500).json({ message: "error deleting resume" });
  // //   }
  // // });
};
