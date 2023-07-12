export type UserProfileMetaDB = {
  uid: number;
  user_type: 0 | 1 | 2;
  icon_img_url: string | null;
  header_img_url: string | null;
  display_name: string;
  email: string;
  password_hash: string;
};

type UserProfileMeta = {
  uid: number;
  userType: 0 | 1 | 2;
  iconImgUrl: string | null;
  headerImgUrl: string | null;
  displayName: string;
  email: string;
  passwordHash: string;
};

type UserProfileMetaWithoutSecureData = {
  uid: number;
  userType: 0 | 1 | 2;
  iconImgUrl: string | null;
  headerImgUrl: string | null;
  displayName: string;
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

export const removeSecureData = (userProfileMeta: UserProfileMeta): UserProfileMetaWithoutSecureData => {
  return {
    uid: userProfileMeta.uid,
    userType: userProfileMeta.userType,
    iconImgUrl: userProfileMeta.iconImgUrl,
    headerImgUrl: userProfileMeta.headerImgUrl,
    displayName: userProfileMeta.displayName
  }
};
