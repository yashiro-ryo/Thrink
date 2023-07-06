export type UserProfileMetaDB = {
  uid: number;
  user_type: 0 | 1 | 2;
  icon_img_url: string;
  header_img_url: string;
  display_name: string;
  email: string;
  password_hash: string;
};

type UserProfileMeta = {
  uid: number;
  userType: 0 | 1 | 2;
  iconImgUrl: string;
  headerImgUrl: string;
  displayName: string;
  email: string;
  passwordHash: string;
};

export const migrateVariableNameForFrontend = (
  userProfileMetaDB: UserProfileMetaDB
): UserProfileMeta => {
  return {
    uid: userProfileMetaDB.uid,
    userType: userProfileMetaDB.user_type,
    iconImgUrl: userProfileMetaDB.icon_img_url,
    headerImgUrl: userProfileMetaDB.header_img_url,
    displayName: userProfileMetaDB.display_name,
    email: userProfileMetaDB.email,
    passwordHash: userProfileMetaDB.password_hash,
  };
};
