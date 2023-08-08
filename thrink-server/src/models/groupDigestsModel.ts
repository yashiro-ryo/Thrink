import { getTargetPage, splitPage } from "../lib/pageNation";
import db from "./database";

type GroupDigestDB = {
  uid: number;
  display_name: string;
  icon_img_url: string;
  activity_detail: string;
};

type GroupDigest = {
  uid: number;
  displayName: string;
  iconImgUrl: string;
  activityDetail: string;
};

export class GroupDigestsModel {
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  groupDigestsCache: Array<Array<GroupDigest>> = [];
  pageLength = 0;
  constructor() {
    this.lastUpdatedTime = new Date().getTime();
    this.updateGroupProfileCache();
  }

  getPageLength() {
    return this.pageLength;
  }

  async getGroupDigests(pageIndex: number): Promise<Array<GroupDigest>> {
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update group digets cache. Because five minutes over");
      // DBからキャッシュを更新する
      await this.updateGroupProfileCache();
    }
    console.log(this.groupDigestsCache);
    // キャッシュを返す
    return Promise.resolve(getTargetPage(this.groupDigestsCache, pageIndex));
  }

  async getGroupDigestByUid(uid: number): Promise<GroupDigest | null> {
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update group digets cache. Because five minutes over");
      // DBからキャッシュを更新する
      await this.updateGroupProfileCache();
    }
    console.log(this.groupDigestsCache);
    // キャッシュからuidを指定して取得する
    return Promise.resolve(this.getTargetGroupDigest(uid));
  }

  getTargetGroupDigest(uid: number): GroupDigest | null {
    let result = null;
    for (let i = 0; i < this.groupDigestsCache.length; i++) {
      for (let j = 0; j < this.groupDigestsCache[i].length; j++) {
        if (this.groupDigestsCache[i][j].uid === uid) {
          result = this.groupDigestsCache[i][j];
          break;
        }
      }
    }
    return result;
  }

  /**
   * 団体のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  async updateGroupProfileCache() {
    // DBからキャッシュを更新する
    this.lastUpdatedTime = await new Date().getTime();
    // 団体のuser_typeは1
    await db
      .query(
        `select user_profile_meta.uid, user_profile_meta.display_name, user_profile_meta.icon_img_url, group_profile.activity_detail from user_profile_meta inner join group_profile on user_profile_meta.uid = group_profile.uid`
      )
      .then((queryRes) => {
        console.log(queryRes);
        this.groupDigestsCache = splitPage(
          this.migrateSnakeCaseToCamelCase(queryRes),
          10
        );
        this.pageLength = this.groupDigestsCache.length;
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
        displayName: digestFromDB.display_name,
        activityDetail: digestFromDB.activity_detail,
      };
    });
  }

  // 検索結果を返す
  async searchGroupDigest(q: string) {
    return await db.query(
      `select user_profile_meta.uid, user_profile_meta.display_name as displayName, user_profile_meta.icon_img_url as iconImgUrl, group_profile.activity_detail as activityDetail from user_profile_meta inner join group_profile on user_profile_meta.uid = group_profile.uid and group_profile.activity_detail like '%${q}%'`
    );
  }
}
