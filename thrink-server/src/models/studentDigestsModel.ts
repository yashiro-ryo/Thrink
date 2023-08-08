import db from "./database";
import { getTargetPage, splitPage } from "../lib/pageNation";

type StudentDigestDB = {
  uid: number;
  icon_img_url: string;
  display_name: string;
  experience: string;
};

type StudentDigest = {
  uid: number;
  iconImgUrl: string;
  displayName: string;
  experience: string;
};

export class StudentDigestsModel {
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  studentDigestsCache: Array<Array<StudentDigest>> = [];
  pageLength = 0;
  constructor() {
    this.lastUpdatedTime = new Date().getTime();
    this.updateStudentProfileCache();
  }

  getPageLength() {
    return this.pageLength;
  }

  async getStudentDigests(pageIndex: number): Promise<Array<StudentDigest>> {
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update student digets cache. Because five minutes over");
      // DBからキャッシュを更新する
      await this.updateStudentProfileCache();
    }
    console.log(this.studentDigestsCache);
    // キャッシュを返す
    return Promise.resolve(getTargetPage(this.studentDigestsCache, pageIndex));
  }

  /**
   * 大学生のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  async updateStudentProfileCache() {
    this.lastUpdatedTime = await new Date().getTime();
    // 学生のuser_typeは0
    await db
      .query(
        `select user_profile_meta.uid, user_profile_meta.display_name, user_profile_meta.icon_img_url, student_profile.experience from user_profile_meta inner join student_profile on user_profile_meta.uid = student_profile.uid`
      )
      .then(async (queryRes) => {
        console.log(queryRes);
        this.studentDigestsCache = await splitPage(
          this.migrateSnakeCaseToCamelCase(queryRes),
          10
        );
        this.pageLength = await this.studentDigestsCache.length;
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
        displayName: digestFromDB.display_name,
        experience: digestFromDB.experience,
      };
    });
  }
}
