import db from "./database";
import { getTargetPage, splitPage } from "../lib/pageNation";

type StudentDigestDB = {
  uid: number;
  icon_img_url: string;
  header_img_url: string;
  display_name: string;
};

type StudentDigest = {
  uid: number;
  iconImgUrl: string;
  headerImgUrl: string;
  displayName: string;
};

export class StudentDigestsModel {
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  studentDigestsCache: Array<Array<StudentDigest>> = [];
  constructor() {
    this.lastUpdatedTime = new Date().getTime();
    this.updateStudentProfileCache()
  }

  getStudentDigests(pageIndex: number): Array<StudentDigest> {
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update student digets cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateStudentProfileCache();
    }
    console.log(this.studentDigestsCache);
    // キャッシュを返す
    return getTargetPage(this.studentDigestsCache, pageIndex);
  }

  /**
   * 大学生のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  updateStudentProfileCache() {
    this.lastUpdatedTime = new Date().getTime();
    // 学生のuser_typeは0
    db.query(
      `select uid, icon_img_url, header_img_url, display_name from user_profile_meta where user_type = 0`
    )
      .then((queryRes) => {
        console.log(queryRes);
        this.studentDigestsCache = splitPage(
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
    studentDigestsFromDB: Array<StudentDigestDB>
  ): Array<StudentDigest> {
    return studentDigestsFromDB.map((digestFromDB: StudentDigestDB) => {
      return {
        uid: digestFromDB.uid,
        iconImgUrl: digestFromDB.icon_img_url,
        headerImgUrl: digestFromDB.header_img_url,
        displayName: digestFromDB.display_name,
      };
    });
  }
}
