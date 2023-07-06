import { Router, Request, Response } from "express";
import db from "../models/database";
import { digestMessage } from "../lib/hash";
import {
  UserProfileMetaDB,
  migrateVariableNameForFrontend,
} from "../models/UserProfileMeta";

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
      `select * from user_profile_meta where email = '${req.body.email}' and password_hash = '${hashedPassword}'`
    )
    .then((queryResult: Array<UserProfileMetaDB>) => {
      if (queryResult.length === 1) {
        return Promise.resolve(queryResult[0]);
      } else {
        // signin失敗したのでエラーメッセージをクライアントに返す
        return Promise.reject("not found");
      }
    })
    .then((userProfileMeta: UserProfileMetaDB) => {
      // frontend用にキャメルケースに変換する
      res.status(200).json({
        userProfileMeta: migrateVariableNameForFrontend(userProfileMeta),
      });
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
  // パラメータチェック
  if (
    !(
      "email" in req.body &&
      "password" in req.body &&
      "name" in req.body &&
      "userType" in req.body
    )
  ) {
    res.status(500).json({ msg: "internal server error" });
    return;
  }
  // ユーザーの存在確認
  await db
    .query(
      `select exists (select * from user_profile_meta where email = '${req.body.email}') as user_check;`
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
      // ユーザーのメタデータを格納する
      await db.query(
        `insert into user_profile_meta (user_type, display_name, email, password_hash) values (${req.body.userType}, '${req.body.name}', '${req.body.email}', '${hashedPassword}')`
      );
      // 先ほど格納したユーザーのメタ情報からuidを取得する
      return await db.query(
        `select * from user_profile_meta where email = '${req.body.email}' and password_hash = '${hashedPassword}'`
      );
    })
    .then((queryRes: Array<UserProfileMetaDB>) => {
      console.log(`target uid: ${queryRes[0].uid}`);
      console.log(`target user type: ${queryRes[0].user_type}`);
      // ユーザー種別ごとにテーブルにデータを挿入する
      if (queryRes[0].user_type === 0) {
        // 大学生むけ
        db.query(
          `insert into student_profile values (${queryRes[0].uid}, '${queryRes[0].display_name}', 0, NULL, 0, NULL, 0, NULL, 0, NULL)`
        );
      } else if (queryRes[0].user_type === 1) {
        // 団体管理者向け
        db.query(
          `insert into group_profile values (${queryRes[0].uid}, '${queryRes[0].display_name}', NULL, NULL, NULL, NULL, NULL, NULL)`
        );
      } else {
        // 生徒、保護者向け
        db.query(
          `insert into student_parent_profile values (${queryRes[0].uid}, '${queryRes[0].display_name}', 0, NULL, 0, NULL, 0, NULL, 0, NULL)`
        );
      }
      res
        .status(200)
        .json({ msg: "successful create user", userProfileMeta: queryRes[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: `server error : ${err}` });
    });
});
