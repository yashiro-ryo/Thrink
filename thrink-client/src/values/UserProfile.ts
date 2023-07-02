export type UserProfile = {
  uid: number
  displayName: string
  profileImageUrl: string
  headerImageUrl: string
  organizationVisibleLevel: number
  organization: string
  introductionVisibleLevel: number
  introduction: string
  experienceVisibleLevel: number
  experience: string
  awardsVisibleLevel: number
  awards: string
  linksVisibleLevel: number
  links: string
  createdAt: string
  updatedAt: string
}

type UserProfileDb = {
  uid: number
  display_name: string
  profile_img_url: string
  header_img_url: string
  organization_visible: number
  organization: string
  introduction_visible: number
  introduction: string
  experience_visible: number
  experience: string
  awards_visible: number
  awards: string
  links_visible: number
  links: string
  created_at: string
  updated_at: string
}

export const migrateDbParamToClientParam = (params: UserProfileDb): UserProfile => {
  return {
    uid: params.uid,
    displayName: params.display_name,
    profileImageUrl: params.profile_img_url,
    headerImageUrl: params.header_img_url,
    organizationVisibleLevel: params.organization_visible,
    organization: params.organization,
    introductionVisibleLevel: params.introduction_visible,
    introduction: params.introduction,
    experienceVisibleLevel: params.experience_visible,
    experience: params.experience,
    awardsVisibleLevel: params.awards_visible,
    awards: params.awards,
    linksVisibleLevel: params.links_visible,
    links: params.links,
    createdAt: params.created_at,
    updatedAt: params.updated_at,
  }
}
