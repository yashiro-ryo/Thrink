import { Response, Request, Router } from "express";
import { StudentDigestsModel } from "../models/studentDigestsModel";

export const stduentsDigestRouter = Router();
const studentDigestModel = new StudentDigestsModel();

stduentsDigestRouter.get("/", (req: Request, res: Response) => {
  console.log("get student digets");
  console.log(`page index : ${req.query.pageIndex}`);
  studentDigestModel
    .getStudentDigests(Number(req.query.pageIndex))
    .then((studentDigests) => {
      res.status(200).json({
        studentDigests,
        pageLength: studentDigestModel.getPageLength(),
      });
    });
});
