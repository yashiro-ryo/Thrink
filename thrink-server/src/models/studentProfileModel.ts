import db from "./database";
import { splitPage, getTargetPage } from "../lib/pageNation";

type StudentProfileDB = {
  uid: number;
  display_name: string;
  experience_visible_level: number;
  experience: string;
  awards_visible_level: number;
  awards: string;
  comment_visible_level: number;
  comment: string;
  links_visible_level: number;
  links: string;
};

// frontend用の型定義
type StudentProfile = {
  uid: number;
  displayName: string;
  experienceVisibleLevel: number;
  experience: string;
  awardsVisibleLevel: number;
  awards: string;
  commentVisibleLevel: number;
  comment: string;
  linksVisibleLevel: number;
  links: string;
};

export class StudentProfileModel {
  studentProfileCache: Array<Array<StudentProfile>> = [];
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  // 最後にキャッシュした時間を記録する関数
  constructor() {
    // 初期の日付を設定
    this.lastUpdatedTime = new Date().getTime();
    // 初回はDBからデータをとってくる
    this.updateStudentProfileCache();
  }

  getStudentProfile(pageIndex: number): Array<StudentProfile> {
    console.log("get student profile");
    console.log(this.studentProfileCache);
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update student profile cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateStudentProfileCache();
    }
    console.log(this.studentProfileCache);
    // キャッシュを返す
    return getTargetPage(this.studentProfileCache, pageIndex);
  }

  /**
   * 大学生のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  updateStudentProfileCache() {
    this.lastUpdatedTime = new Date().getTime();
    db.query(`select * from student_profile`)
      .then((queryRes) => {
        console.log(queryRes);
        this.studentProfileCache = splitPage(
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
    studentProfilesFromDB: Array<StudentProfileDB>
  ): Array<StudentProfile> {
    return studentProfilesFromDB.map((profileFromDB: StudentProfileDB) => {
      return {
        uid: profileFromDB.uid,
        displayName: profileFromDB.display_name,
        experienceVisibleLevel: profileFromDB.experience_visible_level,
        experience: profileFromDB.experience,
        awardsVisibleLevel: profileFromDB.awards_visible_level,
        awards: profileFromDB.awards,
        commentVisibleLevel: profileFromDB.comment_visible_level,
        comment: profileFromDB.comment,
        linksVisibleLevel: profileFromDB.links_visible_level,
        links: profileFromDB.links,
      };
    });
  }
}
