import { Router, Request, Response } from "express";
import { GroupsRepository } from "./groupsRepository";

export const groupsRouter = Router();
const groupsRepo = new GroupsRepository();

// GET /v1/groups
groupsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(groupsRepo.getGroups());
});

// GET /v1/groups/:id
groupsRouter.get("/:id", (req: Request, res: Response) => {
  res.status(200).json(groupsRepo.getGroup(Number(req.params.id)));
});

// GET /v1/groups/profile/:id
groupsRouter.get("/profile/:id", (req: Request, res: Response) => {
  res.status(200).json(groupsRepo.getGroupProfile(Number(req.params.id)));
});
