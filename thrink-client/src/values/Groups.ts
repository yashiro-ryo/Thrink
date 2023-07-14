export type GroupDigest = {
  uid: number
  displayName: string
  iconImgUrl: string
  headerImgUrl: string
}

export type Group = {
  id: number
  name: string
  location: string
  comment: string
}

export type GroupProfile = {
  id: number
  introduction: string
  history: string
  links: {
    web: string
    twitter: string
    facebook: string
    instagram: string
  }
}
