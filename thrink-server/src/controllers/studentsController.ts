import { Request, Response, Router } from "express";
import { StudentsRepository } from "./studentsRepository";
import { StudentProfileModel } from "../models/studentProfileModel";

export const studentsRouter = Router();
const studentsRepo = new StudentsRepository();
const studentProfileModel = new StudentProfileModel();

// GET /v1/students
studentsRouter.get("/", (req: Request, res: Response) => {
  console.log("pageIndex :" + req.query.pageIndex);
  res.status(200).json({
    studentProfile: studentProfileModel.getStudentProfile(
      Number(req.query.pageIndex)
    ),
  });
});

// GET /v1/students/:id
studentsRouter.get("/:id", (req: Request, res: Response) => {
  res.status(200).json(studentsRepo.getStudent(Number(req.params.id)));
});

// GET /v1/students/profile/:id
studentsRouter.get("/profile/:id", (req: Request, res: Response) => {
  res.status(200).json(studentsRepo.getStudentProfile(Number(req.params.id)));
});
