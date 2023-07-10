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

// GET /v1/students/:id
studentsRouter.get("/:id", (req: Request, res: Response) => {
  console.log(`student id: ${req.params.id}`);
  res.status(200).json({
    studentProfile: studentProfileModel.getStudentProfileById(
      Number(req.params.id)
    ),
  });
});

// POST /v1/students/profile/:uid
studentsRouter.post("/profile/:uid", async (req: Request, res: Response) => {
  console.log("update student profile");
  if (
    !(
      "experience" in req.body &&
      "awards" in req.body &&
      "comment" in req.body &&
      "links" in req.body
    )
  ) {
    res.status(500).json({ msg: "internal server error" });
  }
  await studentProfileModel.updateStudentProfile(
    Number(req.params.uid),
    req.body.experience,
    req.body.awards,
    req.body.comment,
    req.body.links
  );
  await studentProfileModel.updateStudentProfileCache();
  await res.status(200).json({ msg: "ok" });
});
