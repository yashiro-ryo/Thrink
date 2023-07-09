import { Response, Request, Router } from "express";
import { StudentDigestsModel } from "../models/studentDigestsModel";

export const stduentsDigestRouter = Router();
const studentDigests = new StudentDigestsModel();

stduentsDigestRouter.get("/", (req: Request, res: Response) => {
  console.log("get student digets");
  console.log(`page index : ${req.query.pageIndex}`);
  res
    .status(200)
    .json({
      studentDigests: studentDigests.getStudentDigests(
        Number(req.query.pageIndex)
      ),
    });
});
