import { Router, Request, Response } from "express";
import { ChatModel } from "../models/chatModel";

export const chatRouter = Router();
const chatModel = new ChatModel();

// POST /v1/chat/create
chatRouter.post(`/create`, async (req: Request, res: Response) => {
  if (!("u1Uid" in req.body) || !("u2Uid" in req.body)) {
    res.status(500).json({ msg: "Internal server error" });
  }
  await chatModel.createChatroom(req.body.u1Uid, req.body.u2Uid);
  await chatModel
    .chatroomIdByUsersId(req.body.u1Uid, req.body.u2Uid)
    .then((queryRes: Array<number>) => {
      if (queryRes.length === 1) {
        res.status(200).json(queryRes[0]);
      } else {
        res.status(500).json({ msg: "Internal server error" });
      }
    });
});
