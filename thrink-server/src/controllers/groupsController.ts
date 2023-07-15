import { Router, Request, Response } from "express";
import { GroupsRepository } from "./groupsRepository";
import { GroupProfileModel } from "../models/groupProfileModel";

export const groupsRouter = Router();
const groupsRepo = new GroupsRepository();
const groupProfileModel = new GroupProfileModel();

// GET /v1/groups
groupsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(groupsRepo.getGroups());
});

// GET /v1/groups/:uid
// グループのプロフィールをuidで取得
groupsRouter.get("/:uid", (req: Request, res: Response) => {
  res.status(200).json({
    groupProfile: groupProfileModel.getGroupProfileById(Number(req.params.uid)),
  });
});

// GET /v1/groups/profile/:id
groupsRouter.get("/profile/:id", (req: Request, res: Response) => {
  res.status(200).json(groupsRepo.getGroupProfile(Number(req.params.id)));
});
