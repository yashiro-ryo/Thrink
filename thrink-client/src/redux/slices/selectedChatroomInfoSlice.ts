import { ChatInfo } from '@/values/Chat'
import { createSlice } from '@reduxjs/toolkit'

const intialSelectedChatroomInfo = (): ChatInfo | null => {
  return null
}

export const selectedChatroomInfoSlice = createSlice({
  name: 'selectedChatroomInfo',
  initialState: {
    selectedChatroomInfo: intialSelectedChatroomInfo(),
  },
  reducers: {
    setSelectedChatroomInfo: (state, action) => {
      state.selectedChatroomInfo = action.payload
    },
  },
})

export const { setSelectedChatroomInfo } = selectedChatroomInfoSlice.actions
export default selectedChatroomInfoSlice.reducer
