import { dummyStudentData, profiles, Profile } from './dummyData'

export const getProfile = (uid: number): Profile | null => {
  let res: any = []
  profiles.forEach((profile: Profile) => {
    if (profile.uid == uid) {
      res.push(profile)
    }
  })
  return res[0]
}

export const getProfileMetaData = (
  uid: number,
): { displayName: string; location: string } | null => {
  let res: any = []
  dummyStudentData.forEach((student) => {
    console.log(student)
    if (student.uid == uid) {
      res.push({ displayName: student.displayName, location: student.affiliation })
    }
  })
  return res[0]
}
