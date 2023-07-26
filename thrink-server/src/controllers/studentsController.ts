import { Request, Response, Router } from "express";
import { StudentProfileModel } from "../models/studentProfileModel";
import { UserProfileMetaModel } from "../models/userProfileMetaModel";
import { convertBase64ToPngFile } from "../lib/file";

export const studentsRouter = Router();
const studentProfileModel = new StudentProfileModel();
const userProfileMetaModel = new UserProfileMetaModel();

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
  let iconImgUrl = "";
  let headerImgUrl = "";
  if (
    !(
      "headerImgBase64" in req.body &&
      "iconImgBase64" in req.body &&
      "experience" in req.body &&
      "awards" in req.body &&
      "comment" in req.body &&
      "links" in req.body
    )
  ) {
    res.status(500).json({ msg: "internal server error" });
  }
  if (req.body.iconImgBase64.length > 0) {
    iconImgUrl = await convertBase64ToPngFile(
      Number(req.params.uid),
      "user-icon",
      req.body.iconImgBase64
    );
  }
  if (req.body.headerImgBase64.length > 0) {
    headerImgUrl = await convertBase64ToPngFile(
      Number(req.params.uid),
      "header-img",
      req.body.headerImgBase64
    );
  }
  console.log(`icon img url: ${iconImgUrl}`);
  console.log(`header img url: ${headerImgUrl}`);
  await userProfileMetaModel.updateUserProfileIconImgHeaderImg(
    Number(req.params.uid),
    iconImgUrl,
    headerImgUrl
  );
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
