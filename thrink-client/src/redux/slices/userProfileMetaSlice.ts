import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { createSlice } from '@reduxjs/toolkit'

const initialUserProfileMeta = (): UserProfileMetaWithoutSecureData | null => {
  return null
}

export const userProfileMetaSlice = createSlice({
  name: 'userProfileMeta',
  initialState: {
    profileMeta: initialUserProfileMeta(),
  },
  reducers: {
    saveUserProfileMeta: (state, action) => {
      state.profileMeta = action.payload
    },
    clearUserProfileMeta: (state) => {
      state.profileMeta = {
        uid: 0,
        displayName: 'dummy user',
        iconImgUrl: null,
        headerImgUrl: null,
        userType: 0,
      }
    },
  },
})

export const { saveUserProfileMeta, clearUserProfileMeta } = userProfileMetaSlice.actions
export default userProfileMetaSlice.reducer
