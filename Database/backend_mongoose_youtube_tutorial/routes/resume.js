import express, { response } from "express";
import resumeController from "../controller/resumeController.js";

const router = express.Router();

router.get("/", resumeController.homePage, (_, response) => {
  return response.status(200).send(response.locals.message);
});

router.get("/resumes", resumeController.getAll, (request, response) => {
  // return   response.status(200).send("hello worl")
  return response.status(200).send(response.locals.resumeData);
});

router.get("/resumes/:id", resumeController.getById, (request, response) => {
  console.log(response.locals.resumeById);
  return response.status(200).send(response.locals.resumeById);
});

router.post("/resumes", resumeController.createResume, (request, response) => {
  return response.status(200).send(response.locals.newResume)
});

router.put("/resumes/:id", resumeController.updateById, (request, response) => {

  return response.status(200).send(response.locals.updatedResume)
});

router.delete("/resumes/:id", resumeController.deleteById, (request, response) => {

  return response.status(200).json({
    message: "Successfully deleted",
    deleted: response.locals.deletedById
  });
});

export default router;
