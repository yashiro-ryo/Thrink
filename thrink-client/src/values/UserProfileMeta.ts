export type UserProfileMeta = {
  uid: number
  user_type: 0 | 1 | 2
  icon_img_url: string
  header_img_url: string
  display_name: string
  email: string
  password_hash: string
}

export type UserProfileMetaWithoutSecureData = {
  uid: number
  userType: 0 | 1 | 2
  iconImgUrl: string | null
  headerImgUrl: string | null
  displayName: string
}
