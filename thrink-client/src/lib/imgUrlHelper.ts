import { GroupDigest, GroupProfile } from '@/values/Groups'
import { StudentDigest, StudentProfile } from '@/values/Students'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

export const filterIconImgUrl = (
  anyDigest: StudentDigest | GroupDigest | UserProfileMetaWithoutSecureData,
) => {
  if (anyDigest === null) {
    return '/user-blank.webp'
  }
  if (anyDigest.iconImgUrl === null) {
    return '/user-blank.webp'
  }
  if (anyDigest.iconImgUrl.length === 0) {
    return '/user-blank.webp'
  } else {
    return anyDigest.iconImgUrl
  }
}

export const filterHeaderImgUrl = (
  profile: StudentProfile | GroupProfile | UserProfileMetaWithoutSecureData,
) => {
  if (profile === null) {
    return '/header-blank.webp'
  }
  if (profile.headerImgUrl === null) {
    return '/header-blank.webp'
  }
  if (profile.headerImgUrl.length === 0) {
    return '/header-blank.webp'
  } else {
    return profile.headerImgUrl
  }
}
