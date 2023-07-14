import { getTargetPage, splitPage } from "../lib/pageNation";
import db from "./database";

type GroupDigestDB = {
  uid: number;
  display_name: string;
  icon_img_url: string;
  header_img_url: string;
};

type GroupDigest = {
  uid: number;
  displayName: string;
  iconImgUrl: string;
  headerImgUrl: string;
};

export class GroupDigestsModel {
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  groupDigestsCache: Array<Array<GroupDigest>> = [];
  constructor() {
    this.lastUpdatedTime = new Date().getTime();
    this.updateGroupProfileCache();
  }

  getGroupDigests(pageIndex: number): Array<GroupDigest> {
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update group digets cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateGroupProfileCache();
    }
    console.log(this.groupDigestsCache);
    // キャッシュを返す
    return getTargetPage(this.groupDigestsCache, pageIndex);
  }

  /**
   * 団体のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  updateGroupProfileCache() {
    this.lastUpdatedTime = new Date().getTime();
    // 団体のuser_typeは1
    db.query(
      `select uid, icon_img_url, header_img_url, display_name from user_profile_meta where user_type = 1`
    )
      .then((queryRes) => {
        console.log(queryRes);
        this.groupDigestsCache = splitPage(
          this.migrateSnakeCaseToCamelCase(queryRes),
          10
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 設定した任意の時間が過ぎているかの確認
  isOverAnyMinutes(nowTime: number) {
    console.log(`last updated time : ${this.lastUpdatedTime}`);
    console.log(`update time : ${this.UPDATE_MINUTES}`);
    console.log(`now time : ${nowTime}`);
    return this.lastUpdatedTime + this.UPDATE_MINUTES < nowTime;
  }

  // フロントエンド用にスネークケースをキャメルケースに変換する関数
  migrateSnakeCaseToCamelCase(
    studentDigestsFromDB: Array<GroupDigestDB>
  ): Array<GroupDigest> {
    return studentDigestsFromDB.map((digestFromDB: GroupDigestDB) => {
      return {
        uid: digestFromDB.uid,
        iconImgUrl: digestFromDB.icon_img_url,
        headerImgUrl: digestFromDB.header_img_url,
        displayName: digestFromDB.display_name,
      };
    });
  }
}
