import { Router, Request, Response } from "express";
import { GroupsRepository } from "./groupsRepository";
import { GroupProfileModel } from "../models/groupProfileModel";
import { convertBase64ToPngFile } from "../lib/file";
import { UserProfileMetaModel } from "../models/userProfileMetaModel";

export const groupsRouter = Router();
const groupsRepo = new GroupsRepository();
const groupProfileModel = new GroupProfileModel();
const userProfileMetaModel = new UserProfileMetaModel();

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

// POST /v1/groups/profile/:uid
groupsRouter.post("/profile/:uid", async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("update group profile");
  let iconImgUrl = "";
  let headerImgUrl = "";
  if (
    !(
      "iconImgBase64" in req.body &&
      "headerImgBase64" in req.body &&
      "activityDetail" in req.body &&
      "activityDay" in req.body &&
      "activityTime" in req.body &&
      "location" in req.body &&
      "membersNum" in req.body &&
      "awards" in req.body
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
  await groupProfileModel.updateGroupProfile(
    Number(req.params.uid),
    req.body.location,
    req.body.activityDetail,
    req.body.activityDay,
    req.body.activityTime,
    req.body.membersNum,
    req.body.awards
  );
  await userProfileMetaModel.updateUserProfileIconImgHeaderImg(
    Number(req.params.uid),
    iconImgUrl,
    headerImgUrl
  );
  await groupProfileModel.updateGroupProfileCache();
  await res.status(200).json({ msg: "ok" });
});
