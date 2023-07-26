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
    await db.query(
      `update user_profile_meta set icon_img_url = '${iconImgUrl}', header_img_url = '${headerImgUrl}' where uid = ${uid}`
    );
  }
}
