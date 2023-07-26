import { GroupDigest, GroupProfile } from '@/values/Groups'
import { StudentDigest, StudentProfile } from '@/values/Students'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

export const filterIconImgUrl = (
  anyDigest: StudentDigest | GroupDigest | UserProfileMetaWithoutSecureData,
) => {
  if (anyDigest === null) {
    return '/user-blank.png'
  }
  if (anyDigest.iconImgUrl === null) {
    return '/user-blank.png'
  }
  if (anyDigest.iconImgUrl.length === 0) {
    return '/user-blank.png'
  } else {
    return anyDigest.iconImgUrl
  }
}

export const filterHeaderImgUrl = (
  profile: StudentProfile | GroupProfile | UserProfileMetaWithoutSecureData,
) => {
  if (profile === null) {
    return '/header-blank.png'
  }
  if (profile.headerImgUrl === null) {
    return '/header-blank.png'
  }
  if (profile.headerImgUrl.length === 0) {
    return '/header-blank.png'
  } else {
    return profile.headerImgUrl
  }
}
