import { Router, Request, Response } from "express";
import { GroupDigestsModel } from "../models/groupDigestsModel";

export const groupDigestsRouter = Router();
const groupDigestsModel = new GroupDigestsModel();

groupDigestsRouter.get("/", (req: Request, res: Response) => {
  console.log("get group digets");
  console.log(`page index : ${req.query.pageIndex}`);
  res.status(200).json({
    groupDigests: groupDigestsModel.getGroupDigests(
      Number(req.query.pageIndex)
    ),
  });
});
