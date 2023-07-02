export type Student = {
  id: number
  name: string
  organization: string
  comment: string
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
