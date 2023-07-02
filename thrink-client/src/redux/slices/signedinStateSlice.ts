import { createSlice } from '@reduxjs/toolkit'

export const signinStateSlice = createSlice({
  name: 'signedinState',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    signin: (state) => {
      state.isSignedIn = true
    },
    signout: (state) => {
      state.isSignedIn = false
    },
  },
})

export const { signin, signout } = signinStateSlice.actions
export default signinStateSlice.reducer
