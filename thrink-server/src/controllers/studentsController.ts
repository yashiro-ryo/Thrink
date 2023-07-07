import { Request, Response, Router } from "express";
import { StudentProfileModel } from "../models/studentProfileModel";

export const studentsRouter = Router();
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
