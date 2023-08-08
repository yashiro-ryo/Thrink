import db from "./database";
import { splitPage, getTargetPage } from "../lib/pageNation";

type StudentProfileDB = {
  uid: number;
  display_name: string;
  experience: string;
  awards: string;
  comment: string;
  links: string;
  icon_img_url: string;
  header_img_url: string;
};

// frontend用の型定義
type StudentProfile = {
  uid: number;
  displayName: string;
  experience: string;
  awards: string;
  comment: string;
  links: string;
  iconImgUrl: string;
  headerImgUrl: string;
};

class StudentProfileModel {
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

  getStudentProfileById(uid: number): StudentProfile | null {
    console.log(`get student profile by id : ${uid}`);
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update student profile cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateStudentProfileCache();
    }
    console.log(this.studentProfileCache);
    // キャッシュを返す
    return this.getTargetStudentProfileByUid(uid);
  }

  getTargetStudentProfileByUid(uid: number): StudentProfile | null {
    let result = null;
    for (let i = 0; i < this.studentProfileCache.length; i++) {
      for (let j = 0; j < this.studentProfileCache[i].length; j++) {
        if (this.studentProfileCache[i][j].uid === uid) {
          result = this.studentProfileCache[i][j];
          break;
        }
      }
    }
    return result;
  }

  /**
   * 大学生のプロフィールをキャッシュとして保持しておくための関数
   * キャッシュに保存後配列を返す
   */
  async updateStudentProfileCache() {
    this.lastUpdatedTime = await new Date().getTime();
    await db
      .query(
        `select student_profile.uid, student_profile.display_name, student_profile.experience, student_profile.awards, student_profile.comment, student_profile.links, user_profile_meta.icon_img_url, user_profile_meta.header_img_url from student_profile inner join user_profile_meta on student_profile.uid = user_profile_meta.uid;`
      )
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
        experience: profileFromDB.experience,
        awards: profileFromDB.awards,
        comment: profileFromDB.comment,
        links: profileFromDB.links,
        iconImgUrl: profileFromDB.icon_img_url,
        headerImgUrl: profileFromDB.header_img_url,
      };
    });
  }

  // student profileをupdateする関数
  async updateStudentProfile(
    uid: number,
    experience: string,
    awards: string,
    comment: string,
    links: string
  ) {
    console.log(uid);
    console.log(experience);
    console.log(awards);
    console.log(comment);
    console.log(links);
    await db.query(
      `update student_profile set experience = '${experience}', awards = '${awards}', comment = '${comment}', links = '${links}' where uid = ${uid};`
    );
  }
}

const studentProfileModel = new StudentProfileModel();
export default studentProfileModel;
