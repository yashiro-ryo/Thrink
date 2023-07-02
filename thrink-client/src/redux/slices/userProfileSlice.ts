import { createSlice } from '@reduxjs/toolkit'

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: {
      uid: 0,
      displayName: '',
      profileImageUrl: '',
      headerImageUrl: '',
      organizationVisibleLevel: 0,
      organization: '',
      introductionVisibleLevel: 0,
      introduction: '',
      experienceVisibleLevel: 0,
      experience: '',
      awardsVisibleLevel: 0,
      awards: '',
      linksVisibleLevel: 0,
      links: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  reducers: {
    saveUserProfile: (state, action) => {
      state.profile = action.payload
    },
    clearUserProfile: (state) => {
      state.profile = {
        uid: 0,
        displayName: '',
        profileImageUrl: '',
        headerImageUrl: '',
        organizationVisibleLevel: 0,
        organization: '',
        introductionVisibleLevel: 0,
        introduction: '',
        experienceVisibleLevel: 0,
        experience: '',
        awardsVisibleLevel: 0,
        awards: '',
        linksVisibleLevel: 0,
        links: '',
        createdAt: '',
        updatedAt: '',
      }
    },
  },
})

export const { saveUserProfile, clearUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
