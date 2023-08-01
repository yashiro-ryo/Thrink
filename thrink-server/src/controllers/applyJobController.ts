import { Request, Response, Router } from "express";
import { ChatModel } from "../models/chatModel";

export const applyJobRouter = Router();

const chatModel = new ChatModel();

// POST /v1/job/apply
applyJobRouter.post("/apply", async (req: Request, res: Response) => {
  console.log("get job/apply");
  console.log(req.body);
  // トークルーム作成
  await chatModel.createChatroom(req.body.uid, req.body.jobUid);
  // chatroomId取得
  await chatModel
    .chatroomIdByUsersId(req.body.uid, req.body.jobUid)
    .then(async (queryRes) => {
      if (queryRes.length === 0) {
        res.status(500).json({ msg: "ng" });
      }
      // メッセージ作成
      await chatModel.insertChatMessage(
        queryRes[0].chatroomId,
        req.body.uid,
        req.body.jobUid,
        `${req.body.jobId}`,
        "job-apply"
      );
      // トークメッセージ送信
      res.json({ msg: "ok" });
    });
  return;
});
