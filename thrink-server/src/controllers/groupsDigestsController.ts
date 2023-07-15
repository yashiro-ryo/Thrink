import { Router, Request, Response } from "express";
import { GroupDigestsModel } from "../models/groupDigestsModel";

export const groupDigestsRouter = Router();
const groupDigestsModel = new GroupDigestsModel();

// GET /v1/digests/group
// グループのダイジェストを取得するエンドポイント
// ページング番号: pageIndex
groupDigestsRouter.get("/", (req: Request, res: Response) => {
  console.log("get group digets");
  console.log(`page index : ${req.query.pageIndex}`);
  res.status(200).json({
    groupDigests: groupDigestsModel.getGroupDigests(
      Number(req.query.pageIndex)
    ),
  });
});

// GET /v1/digests/group/:uid
// グループのMetaデータをuidで取得する関数
groupDigestsRouter.get("/:uid", (req: Request, res: Response) => {
  console.log("get group digest by uid");
  console.log(`uid: ${req.params.uid}`);
  res.status(200).json({
    groupProfileMeta: groupDigestsModel.getGroupDigestByUid(
      Number(req.params.uid)
    ),
  });
});
