import db from "./database";
import { getTargetPage, splitPage } from "../lib/pageNation";

type GroupProfileDB = {
  uid: number;
  display_name: string;
  location: string;
  activity_detail: string;
  activity_day: string;
  activity_time: string;
  members_num: number;
  awards: string;
  icon_img_url: string;
  header_img_url: string;
};

type GroupProfile = {
  uid: number;
  displayName: string;
  location: string;
  activityDetail: string;
  activityDay: string;
  activityTime: string;
  membersNum: number;
  awards: string;
  iconImgUrl: string;
  headerImgUrl: string;
};

class GroupProfileModel {
  groupProfileCache: Array<Array<GroupProfile>> = [];
  lastUpdatedTime = 0;
  // 5分後にDBからキャッシュを更新する
  UPDATE_MINUTES = 5 * 60 * 1000;
  // 最後にキャッシュした時間を記録する関数
  constructor() {
    // 初期の日付を設定
    this.lastUpdatedTime = new Date().getTime();
    // 初回はDBからデータをとってくる
    this.updateGroupProfileCache();
  }

  getGroupProfile(pageIndex: number): Array<GroupProfile> {
    console.log("get group profile");
    console.log(this.groupProfileCache);
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update group profile cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateGroupProfileCache();
    }
    console.log(this.groupProfileCache);
    // キャッシュを返す
    return getTargetPage(this.groupProfileCache, pageIndex);
  }

  getGroupProfileById(uid: number): GroupProfile | null {
    console.log(`get group profile by id : ${uid}`);
    // 最後にDBからデータをとってきてから5分経過後の場合は更新する
    if (this.isOverAnyMinutes(new Date().getTime())) {
      console.log("Update group profile cache. Because five minutes over");
      // DBからキャッシュを更新する
      this.updateGroupProfileCache();
    }
    console.log(this.groupProfileCache);
    // キャッシュを返す
    return this.getTargetGroupProfileByUid(uid);
  }

  getTargetGroupProfileByUid(uid: number): GroupProfile | null {
    let result = null;
    for (let i = 0; i < this.groupProfileCache.length; i++) {
      for (let j = 0; j < this.groupProfileCache[i].length; j++) {
        if (this.groupProfileCache[i][j].uid === uid) {
          result = this.groupProfileCache[i][j];
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
  async updateGroupProfileCache() {
    this.lastUpdatedTime = await new Date().getTime();
    await db
      .query(
        `select group_profile.uid, group_profile.display_name, group_profile.activity_detail, group_profile.activity_day, group_profile.activity_time, group_profile.members_num, group_profile.location, group_profile.awards, user_profile_meta.icon_img_url, user_profile_meta.header_img_url from group_profile inner join user_profile_meta on group_profile.uid = user_profile_meta.uid;`
      )
      .then((queryRes) => {
        console.log(queryRes);
        this.groupProfileCache = splitPage(
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
    groupProfilesFromDB: Array<GroupProfileDB>
  ): Array<GroupProfile> {
    return groupProfilesFromDB.map((profileFromDB: GroupProfileDB) => {
      return {
        uid: profileFromDB.uid,
        displayName: profileFromDB.display_name,
        location: profileFromDB.location,
        activityDetail: profileFromDB.activity_detail,
        activityDay: profileFromDB.activity_day,
        activityTime: profileFromDB.activity_time,
        membersNum: profileFromDB.members_num,
        awards: profileFromDB.awards,
        iconImgUrl: profileFromDB.icon_img_url,
        headerImgUrl: profileFromDB.header_img_url,
      };
    });
  }

  // group profileをupdateする関数
  async updateGroupProfile(
    uid: number,
    location: string,
    activityDetail: string,
    activityDay: string,
    activityTime: string,
    memberNum: number,
    awards: string
  ) {
    console.log(uid);
    console.log(location);
    console.log(activityDetail);
    console.log(activityDay);
    console.log(activityTime);
    console.log(memberNum);
    console.log(awards);
    await db.query(
      `update group_profile set location = '${location}', activity_detail = '${activityDetail}', activity_day = '${activityDay}', activity_time = '${activityTime}', members_num = ${memberNum}, awards = '${awards}' where uid = ${uid};`
    );
  }
}

const groupProfileModel = new GroupProfileModel();
export default groupProfileModel;
