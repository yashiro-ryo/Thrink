import { Router, Request, Response } from "express";
import db from "../models/database";
import { digestMessage } from "../lib/hash";

export const userAuthRouter = Router();

// POST /signin
userAuthRouter.post("/signin", async (req: Request, res: Response) => {
  console.log(req.body);
  if (!("email" in req.body && "password" in req.body)) {
    res.status(500).json({ msg: "parameter error" });
    return;
  }
  // パスワードハッシュ化
  const hashedPassword = await digestMessage(req.body.password);
  console.log(hashedPassword);
  // ユーザー問い合わせ
  await db
    .query(
      `select uid from user_auth where email = '${req.body.email}' and password_hash = '${hashedPassword}'`
    )
    .then((data: Array<{ uid: number }>) => {
      console.log(data);
      if (data.length === 1) {
        // signin成功したのでprofileを取得する
        return db.query(
          `select * from user_profile where uid = ${data[0].uid}`
        );
      } else {
        // signin失敗したのでエラーメッセージをクライアントに返す
        return Promise.reject("not found");
      }
    })
    .then((data: any) => {
      console.log(data);
      res.status(200).json(data.user_profile);
    })
    .catch((err: any) => {
      console.error(err);
      if (err === "not found") {
        res.status(400).json({ msg: "bad request" });
      } else {
        res.status(500).json({ msg: "server error" });
      }
    });
});

// POST /signup
userAuthRouter.post("/signup", async (req: Request, res: Response) => {
  if (!("email" in req.body && "password" in req.body && "name" in req.body)) {
    res.status(500).json({ msg: "internal server error" });
    return;
  }
  // ユーザーの存在確認
  await db
    .query(
      `select exists (select * from user_auth where email = '${req.body.email}') as user_check;`
    )
    .then((queryRes) => {
      console.log(`user check result : ${queryRes[0].user_check}`);
      if (queryRes[0].user_check === 1) {
        // ユーザー存在した
        return Promise.reject("user already exists");
      } else {
        // ユーザー存在しなかった(アカウント作成に移行)
        return Promise.resolve();
      }
    })
    .then(async () => {
      // パスワードハッシュ化
      const hashedPassword = await digestMessage(req.body.password);
      console.log(hashedPassword);
      // user_authテーブルにユーザー情報を作成する
      await db.query(
        `insert into user_auth (email, password_hash) values ('${req.body.email}', '${hashedPassword}');`
      );
      // user_authテーブルからuidを取得する
      return await db.query(
        `select uid from user_auth where email = '${req.body.email}' and password_hash = '${hashedPassword}'`
      );
    })
    .then(async (queryRes) => {
      console.log(`target uid: ${queryRes[0].uid}`);
      // 取得したuidを元にuser_profileテーブルにユーザーを作成する
      await db.query(
        `insert into user_profile values (${queryRes[0].uid}, '${req.body.name}', '', '', 1, '', 1, '', 1, '', 1, '', 1, '', '2023-06-30 23:00:00', '2023-06-30 23:00:00')`
      );
      return await db.query(
        `select * from user_profile where uid = ${queryRes[0].uid}`
      );
    })
    .then((queryRes) => {
      res.status(200).json({ msg: queryRes[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: `server error : ${err}` });
    });
});
