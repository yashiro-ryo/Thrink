import db from "./database";

export class UserProfileMetaModel {
  constructor() {}

  async updateUserProfileIconImgHeaderImg(
    uid: number,
    iconImgUrl: string,
    headerImgUrl: string
  ) {
    console.log("update user icon header img");
    console.log(`${uid}-${iconImgUrl}-${headerImgUrl}`);
    if (iconImgUrl.length === 0 && headerImgUrl.length > 0) {
      await db.query(
        `update user_profile_meta set header_img_url = '${headerImgUrl}' where uid = ${uid}`
      );
    } else if (headerImgUrl.length === 0 && iconImgUrl.length > 0) {
      await db.query(
        `update user_profile_meta set icon_img_url = '${iconImgUrl}' where uid = ${uid}`
      );
    } else if (iconImgUrl.length === 0 && headerImgUrl.length === 0) {
      // do nothing
    } else {
      await db.query(
        `update user_profile_meta set icon_img_url = '${iconImgUrl}', header_img_url = '${headerImgUrl}' where uid = ${uid}`
      );
    }
  }
}
