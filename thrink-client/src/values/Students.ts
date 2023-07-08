export type StudentDigest = {
  uid: number
  displayName: string
  iconImgUrl: string
  headerImgUrl: string
}

export type StudentProfile = {
  id: number
  introduction: string
  career: string
  links: {
    twitter: string
    facebook: string
    instagram: string
  }
}
